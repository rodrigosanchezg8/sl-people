import {Observable} from 'rxjs';

export interface CrudOperations<T> {
  save(body: object): Observable<T>;
  update(id: number, body: object): Observable<T>;
  findOne(id: number): Observable<T>;
  findAll(): Observable<T[]>;
  delete(id: number): Observable<T>;
}
