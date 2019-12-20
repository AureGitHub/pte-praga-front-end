import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../components/alert.service';
import { LoadingService } from '../components/loading.service';

@Injectable({
  providedIn: 'root'
})



export class InterceptorService implements HttpInterceptor {


    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
      headers: this.headers
    };

  constructor(
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {}



  private handleErro<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        const strError = '(' + operation + ') ' + error.status + ', ' + error.statusText +  ', ' + error.url;

        this.loadingService.mostar(false);
        // TODO: send the error to remote logging infrastructure
        this.alertService.error(strError, false, 30000);

        // TODO: better job of transforming error for user consumption

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
    }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token: string = localStorage.getItem('token');



    this.loadingService.mostar(true);

    // if (token) {
    //   request = req.clone({
    //     setHeaders: {
    //       authorization: `Bearer ${ token }`
    //     }
    //   });
    // }

    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});


    return next.handle(req).pipe(
        tap(_ =>{this.loadingService.mostar(false);} ),
      catchError(this.handleErro<any>('operacion'))
    );
  }

}
