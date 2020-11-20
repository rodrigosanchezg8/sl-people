import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: any[] = [];

  public showSuccess(message = 'Success'): void {
    this.toasts.push({
      text: message,
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
    });
  }

  public showError(message: string): void {
    this.toasts.push({
      text: message,
      classname: 'bg-danger text-light',
      delay: 4000,
      autohide: true,
    });
  }

}
