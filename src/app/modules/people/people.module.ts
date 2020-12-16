import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleComponent} from './people.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCountModalComponent} from './frequency-count-modal/frequency-count-modal.component';
import {DuplicatedPeopleModalComponent} from './duplicated-people-modal/duplicated-people-modal.component';
import {ToastModule} from '../../shared/components/toast/toast.module';
import {AddPersonModalComponent} from './add-person-modal/add-person-modal.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: PeopleComponent}
];

@NgModule({
  declarations: [
    PeopleComponent,
    FrequencyCountModalComponent,
    DuplicatedPeopleModalComponent,
    AddPersonModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    ToastModule
  ]
})

export class PeopleModule {
}
