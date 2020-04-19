import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert.service';
import { LoadingService } from '../components/loading.service';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})



export class InterceptorService implements HttpInterceptor {

  KeySecure = 'Authorization';

  currentUser: User;

    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
      headers: this.headers
    };

  constructor(
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    } );

  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.alertService.clear();
    this.loadingService.mostar(true);

    if (this.currentUser && this.currentUser.token) {
      req = req.clone({headers: req.headers.set('authorization', this.currentUser.token)});
    }

    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

    return next.handle(req).pipe(
        tap(evt => {
          this.loadingService.mostar(false);
          if (evt instanceof HttpResponse) {
              if(evt.body)
              {
                if (evt.body['authorization']) {
                  this.authenticationService.refreshSecure(evt.body['authorization']);
                }

              }
          }
        }),
      // catchError(this.handleErro<any>('operacion'))
      catchError((err: any) => {
        this.loadingService.mostar(false);
        if (err instanceof HttpErrorResponse) {

          let strError = '';
          if(err.status === 500) {
            strError =  err.status + ', ' + (err.error.message ? err.error.message : err.error);
          } else  if (err.status === 0) {
            strError =  `${err.status} , El servidor no está disponible. (${err.url})`;
          } else {
            const inError = err.error.error ? err.error.error : null;
            const inMessage = err.error.message ? err.error.message : null;
            strError =  err.status + ', ' + (inError ? inError : (inMessage ? inMessage : err.error));

          }
          this.alertService.error(strError, false, 30000);
        }
        return of(err);
      }
      ));
  }

}
