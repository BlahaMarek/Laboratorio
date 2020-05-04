import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public userSvc: UserService, private _snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        

        if (this.userSvc.getLoginStatus()) {
          request = this.addToken(request);
        }
    
        return next.handle(request).pipe(catchError(error => {
          let errMessage = "";
          if (error instanceof HttpErrorResponse && error.status === 401) {
            errMessage = "Neautorizovaný prístup. Prihláste sa prosím.";
          } else {
            if (!!error.error && !!error.error.errmsg) {
              errMessage = error.error.errmsg;
            } 
            else if(!!error.error && !!error.error.message) {
              errMessage = error.error.message;
            }
            else {
              errMessage = error.message;
            }
            this._snackBar.open(errMessage, '', {
              duration: 2000,
            });
          }
          return throwError(error);
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