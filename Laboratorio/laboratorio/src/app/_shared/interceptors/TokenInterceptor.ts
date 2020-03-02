import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public userSvc: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

        if (this.userSvc.getLoginStatus()) {
          request = this.addToken(request);
        }
    
        return next.handle(request).pipe(catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return throwError('Neautorizovany pristup');
          } else {
            return throwError(error);
          }
        }));
      }
    
      private addToken(request: HttpRequest<any>) {
          const currentUser = localStorage.getItem('currentUser');
          const token = JSON.parse(currentUser).token;

        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

}