import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  message = '';
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastrSvc: ToastrService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');

    if (undefined == token) {
      this.toastrSvc.error("No token provided");
      this.emailStatus = EmailStatus.Failed;
      return;
    }

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.activateUser(token);

  }

  activateUser(token: string) {
    this.userRegistrationSvc.activateUser(token)
          .subscribe(
            data => {
              this.toastrSvc.success(data);
              this.router.navigate(['../../../login'], { relativeTo: this.route });
            },
            error => {
              this.toastrSvc.error(error);
              this.emailStatus = EmailStatus.Failed;
            }
    );
  }

}

enum EmailStatus {
  Verifying,
  Failed
}
