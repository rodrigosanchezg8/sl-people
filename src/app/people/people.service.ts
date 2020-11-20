import {Injectable} from '@angular/core';
import {Person} from '../models/person';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends CrudService<Person> {

  constructor(public http: HttpClient) {
    super(http, 'v2/people', Person);
  }

}
