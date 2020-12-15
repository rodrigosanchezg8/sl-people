import {Injectable} from '@angular/core';
import {Person} from '../models/person';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends CrudService<Person> {

  /**
   * Extends the CRUDService using the type class `Person`. When invoking `super`, the `HttpClient`, the resource URI and the class
   * `Person` are provided.
   * @param http Injectable
   */
  constructor(public http: HttpClient) {
    super(http, 'v2/people', Person);
  }

}
