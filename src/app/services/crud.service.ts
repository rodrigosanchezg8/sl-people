import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudOperations} from '../interfaces/crud-operations';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {APIResponse} from '../interfaces/api-response';

/**
 * Abstract class of generic declaration useful to be extended by any model service. It receives the resource or model
 * URI and the class model. It forces the implementation of every CRUD method.
 */
@Injectable({providedIn: 'root'})
export abstract class CrudService<T> implements CrudOperations<T> {

  constructor(protected http: HttpClient,
              protected resourceURI: string,
              protected Model: any) {
  }

  public findAll(): Observable<T[]> {
    return this.http.get(this.resourceURI).pipe(map((res: APIResponse) => this.Model.deserializeMany(res.data)));
  }

  public findOne(id: number): Observable<T> {
    return this.http.get(`${this.resourceURI}/${id}`)
      .pipe(map((res: APIResponse) => new this.Model().deserialize(res.data)));
  }

  save(body: any): Observable<T> {
    return this.http.post(this.resourceURI, {body})
      .pipe(map((res: APIResponse) => new this.Model().deserialize(res.data)));
  }

  update(id: number, body: any): Observable<T> {
    return this.http.put(`${this.resourceURI}/${id}`, {body})
      .pipe(map((res: APIResponse) => new this.Model().deserialize(res.data)));
  }

  delete(id: number): Observable<T> {
    return this.http.delete(`${this.resourceURI}/${id}`).pipe(map((res: APIResponse) => new this.Model().deserialize(res.data)));
  }


}
