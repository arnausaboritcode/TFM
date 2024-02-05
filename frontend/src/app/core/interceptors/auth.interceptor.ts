import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpParams } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class authInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const authReq = req.clone({
        params: req.params
        ? req.params.set('api_key', environment.API_KEY)
        : new HttpParams().set('api_key', environment.API_KEY)
      });
      console.log('Making an authorized request');
      return next.handle(authReq);
  }
}
