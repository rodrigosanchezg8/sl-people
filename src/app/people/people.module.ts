import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleComponent} from './people.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCountModalComponent} from './frequency-count-modal/frequency-count-modal.component';

const routes: Routes = [
  {path: '', component: PeopleComponent}
];

@NgModule({
  declarations: [
    PeopleComponent,
    FrequencyCountModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})

export class PeopleModule {
}
