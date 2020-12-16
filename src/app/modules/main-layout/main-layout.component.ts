import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService.showSuccess('You have logged in');
  }

}
