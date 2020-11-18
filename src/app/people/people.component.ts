import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {APIResponse} from '../interfaces/api-response';
import {Person} from '../models/person';
import {TableState} from '../interfaces/table-state';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FrequencyCountModalComponent} from './frequency-count-modal/frequency-count-modal.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  private peopleObservable: Observable<any>;
  private peopleSubscribable: Subscription;
  private people: Person[];

  public tableState: TableState = {
    columns: ['Name', 'Email address', 'Job title'],
    loading: true
  };

  constructor(private http: HttpClient,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.peopleObservable = this.http.get('v2/people');
    this.peopleSubscribable = this.peopleObservable.subscribe((obs: APIResponse) => {
      this.tableState.loading = true;
      this.people = Person.deserializeMany(obs.data);
      this.tableState.loading = false;
    });
  }

  openFrequencyCountModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(FrequencyCountModalComponent);
    if (this.people && this.people.length) {
      modalRef.componentInstance.people = this.people;
    }
  }

  ngOnDestroy(): void {
    this.peopleSubscribable.unsubscribe();
  }

}
