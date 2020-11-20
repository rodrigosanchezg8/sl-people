import {Component, OnInit} from '@angular/core';
import {Person} from '../models/person';
import {TableState} from '../interfaces/table-state';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCountModalComponent} from './frequency-count-modal/frequency-count-modal.component';
import {DuplicatedPeopleModalComponent} from './duplicated-people-modal/duplicated-people-modal.component';
import {PeopleService} from './people.service';
import {ToastService} from '../toast/toast.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  private people: Person[];

  public tableState: TableState = {
    columns: ['Name', 'Email address', 'Job title'],
    loading: true
  };

  constructor(private modalService: NgbModal,
              private peopleService: PeopleService,
              public toastService: ToastService) {
  }

  ngOnInit(): void {
    this.fetchPeople();
  }

  async fetchPeople(): Promise<void> {
    try {
      this.tableState.loading = true;
      this.people = await this.peopleService.findAll().toPromise();
      this.tableState.loading = false;
    } catch (e) {
      this.tableState.loading = false;
      this.toastService.showError(e.message);
    }
  }

  openFrequencyCountModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(FrequencyCountModalComponent);
    if (this.people && this.people.length) {
      modalRef.componentInstance.people = this.people;
    }
  }

  openDuplicatedPeopleModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(DuplicatedPeopleModalComponent);
    if (this.people && this.people.length) {
      modalRef.componentInstance.people = this.people;
    }
  }

}
