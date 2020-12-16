import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', loadChildren: () => import('../main-layout/main-layout.module').then(m => m.MainLayoutModule)}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule {
}
