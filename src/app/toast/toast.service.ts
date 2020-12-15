import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: any[] = [];

  /**
   * Manipulates the array that when pushed triggers the Ngb component and shows the successful message based on its properties.
   * @param message Message to show
   */
  public showSuccess(message = 'Success'): void {
    this.toasts.push({
      text: message,
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
    });
  }

  /**
   * Manipulates the array that when pushed triggers the Ngb component and shows the error message based on its properties.
   * @param message Message to show
   */
  public showError(message: string): void {
    this.toasts.push({
      text: message,
      classname: 'bg-danger text-light',
      delay: 4000,
      autohide: true,
    });
  }

}
