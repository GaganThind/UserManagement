import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  message = '';
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private router: Router,
    private route: ActivatedRoute,
    private notificationSvc: NotificationService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');

    // May not be needed, as router will not call this component if token is not present
    if (undefined == token) {
      this.notificationSvc.error("No token provided");
      this.emailStatus = EmailStatus.Failed;
      return;
    }

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.userRegistrationSvc.activateUser(token)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.notificationSvc.success(data, 5000);
              this.router.navigate(['../../../login'], { relativeTo: this.route });
            },
            error => {
              this.notificationSvc.error(error);
              this.emailStatus = EmailStatus.Failed;
            }
    );

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

enum EmailStatus {
  Verifying,
  Failed
}
