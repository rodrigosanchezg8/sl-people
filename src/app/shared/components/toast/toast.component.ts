import {Component} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  /**
   * This component has the HTML for the Ngb toast for bootstrap and SCSS for styling.
   * @param toastService Injectable
   */
  constructor(public toastService: ToastService) {
  }

}
