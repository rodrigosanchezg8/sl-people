import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main-layout.component';
import {RouterModule, Routes} from '@angular/router';
import {ToastModule} from '../../shared/components/toast/toast.module';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./../people/people.module').then(m => m.PeopleModule)}
    ]
  }
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastModule
  ]
})
export class MainLayoutModule {
}
