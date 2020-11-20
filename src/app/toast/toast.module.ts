import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastComponent} from './toast.component';

@NgModule({
  declarations: [
    ToastComponent
  ],
  exports: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class ToastModule {
}
