import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { TimeoutService } from '../timeout.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

    constructor(
      private timeoutService: TimeoutService
      ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {

        return this.currentUserSubject.value;
    }

    refreshSecure(dataServer) {
      if (dataServer) {
        const user: any  = dataServer.user;
        user.token = dataServer.token;
        user.expire = dataServer.expire;
        user.timeout = dataServer.timeout;
        user.isAdmin = user.IsAdmin;
        user.IsJugador = user.IsJugador;
        user.isConectado = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.timeoutService.ClearTiempoEspera();
    }
}
