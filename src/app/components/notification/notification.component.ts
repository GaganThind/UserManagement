import { Component, TemplateRef } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  constructor(public notificationSvc: NotificationService) { }

  isTemplate(toast) { 
    return toast.textOrTpl instanceof TemplateRef; 
  }
  
}
