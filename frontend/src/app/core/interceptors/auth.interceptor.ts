import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class authInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      params: req.params
        ? req.params.set('api_key', environment.API_KEY_FRONTEND)
        : new HttpParams().set('api_key', environment.API_KEY_FRONTEND),
    });
    console.log('Making an authorized request');
    return next.handle(authReq);
  }
}
