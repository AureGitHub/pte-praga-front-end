import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AlertService } from '../components/alert.service';
import { User } from 'src/app/models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    apiurl = 'api/users';

    constructor(private http: HttpClient, private alertService: AlertService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {

        return this.currentUserSubject.value;
    }


    handleError() {

    }

    setUser(user: User) {

    }

    // habrá que hacer algo parecido para el login contra el backend real
    login1(userLog: User): Observable<User> {

      return this.http.post<User>(this.apiurl, userLog).pipe(
        tap(user => {
          if (user) {
                 user.isAdmin = user.idperfil === 1;
                 user.isConectado = true;
                 localStorage.setItem('currentUser', JSON.stringify(user));
                 this.currentUserSubject.next(user);
               }
        },
            error => {this.alertService.error(JSON.stringify(error), false, 30000); })
      );

        // return this.http.get<User[]>('../../../assets/fake/user.json')
        // .pipe(
        //   map(users => {
        //   const user = users.find(item =>
        //     item.email === userLog.email && item.password ===  userLog.password );
        //   if (user) {
        //     user.isAdmin = user.idperfil === 1;
        //     user.isConectado = true;
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        //   }
        //   return user != null;
        // },
        // error => {console.log('error login ' + error);}
        // )
        // );

    }


        // Para salir del paso... ataco al backend fake
        login(userLog: User): Observable<User> {

            return this.http.get<User[]>(this.apiurl)
            .pipe(
              map(users => {
              const user = users.find(item =>
                item.email === userLog.email && item.password ===  userLog.password );
              if (user) {
                user.isAdmin = user.idperfil === 1;
                user.isConectado = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
              }
              return user;
            }
            )
            );
        }



    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
