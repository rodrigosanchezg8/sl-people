import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone: HttpRequest<any> = req.clone({
      url: environment.apiURI + req.url,
      setHeaders: {
        Authorization: `Bearer ${environment.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(clone);
  }

}
