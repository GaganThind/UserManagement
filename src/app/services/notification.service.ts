import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  /**
   * Variable that stores all the push notifications
   */
  toasts: any[] = [];

  /**
   * Notification timeout delay
   */
  private static NOTIFY_DELAY = 3000;

  /**
   * Method used to add notifications to an array along with other properties
   * 
   * @param textOrTpl - Text error message or template for which the error is to be thrown
   * @param options - Other properties to be set for the notification
   */
  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  /**
   * Methos used to remove the notification from the array to be display to user
   * 
   * @param toast - notification to be removed
   */
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  /**
   * Method used to show simple message to user
   * 
   * @param message - message text
   * @param delay - notification toast timeout
   */
  showStandard(message: string, delay: number = NotificationService.NOTIFY_DELAY) {
    this.show(message);
  }

  /**
   * Method used to show success message to user
   * 
   * @param message - message text
   * @param delay - notification toast timeout
   */
  success(message: string, delay: number = NotificationService.NOTIFY_DELAY) {
    this.show(message, { classname: 'bg-success text-light', delay:  delay });
  }

  /**
   * Method used to show error message to user
   * 
   * @param message - message text
   * @param delay - notification toast timeout
   */
  error(message: string, delay: number = NotificationService.NOTIFY_DELAY) {
    this.show(message, { classname: 'bg-danger text-light', delay: delay });
  }

  /**
   * Method used to show warning message to user
   * 
   * @param message - message text
   * @param delay - notification toast timeout
   */
  warning(message: string, delay: number = NotificationService.NOTIFY_DELAY) {
    this.show(message, { classname: 'bg-warning text-light', delay: delay });
  }

  /**
   * Method used to show info message to user
   * 
   * @param message - message text
   * @param delay - notification toast timeout
   */
  info(message: string, delay: number = NotificationService.NOTIFY_DELAY) {
    this.show(message, { classname: 'bg-info text-light', delay: delay });
  }

}
