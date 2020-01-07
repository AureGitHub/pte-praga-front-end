import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

    constructor(

      ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {

        return this.currentUserSubject.value;
    }


    // habrá que hacer algo parecido para el login contra el backend real


        // Para salir del paso... ataco al backend fake

        refreshSecure(dataServer){
          const user: any  = dataServer['x-access-token'].user;
          user.token = dataServer['x-access-token'].token;
          user.expire = dataServer['x-access-token'].expire;
          user.isAdmin = user.idperfil === 1;
          user.isConectado = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }




    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
