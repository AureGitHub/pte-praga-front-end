import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { HttpGralService, apisUrl } from './http.gral.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    apiurl = 'api/users';

    constructor(
      private httpGralService: HttpGralService
      ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {

        return this.currentUserSubject.value;
    }


    // habrá que hacer algo parecido para el login contra el backend real
    

        // Para salir del paso... ataco al backend fake
        login(dataServer) {            
          const user: User  = dataServer.data;
          user.token = dataServer.token;
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
