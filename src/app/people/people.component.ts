import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {APIResponse} from '../interfaces/api-response';
import {Person} from '../models/person';
import {TableState} from '../interfaces/table-state';

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
    columns: ['Name', 'Email address', 'Job title', 'Actions'],
    loading: true
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.peopleObservable = this.http.get('v2/people');
    this.peopleSubscribable = this.peopleObservable.subscribe((obs: APIResponse) => {
      this.tableState.loading = true;
      this.people = Person.deserializeMany(obs.data);
      this.tableState.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.peopleSubscribable.unsubscribe();
  }

}
