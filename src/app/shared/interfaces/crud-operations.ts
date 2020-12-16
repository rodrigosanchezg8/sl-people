import {Observable} from 'rxjs';

/**
 * Useful to declare the CRUD methods, it is implemented by the CRUD service.
 */
export interface CrudOperations<T> {
  save(body: object): Observable<T>;
  update(id: number, body: object): Observable<T>;
  findOne(id: number): Observable<T>;
  findAll(): Observable<T[]>;
  delete(id: number): Observable<T>;
}
