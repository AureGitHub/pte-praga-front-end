import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { AlertService } from '../components/alert.service';
import { AuthenticationService } from './authentication.service';


// const server='api';  // from memory
 const server = 'http://localhost:4000';     // from nodes js
 // const server = 'https://pte-praga-back-end.herokuapp.com';


export const apisUrl = {
  login : server + '/login',
  pedirCodigoForgetPass : server + '/pedirCodigoForgetPass', 
  cambiarPasswordForget  : server + '/cambiarPasswordForget ', 
  
  cambiar_password : server + '/cambiarPassword',
  ask_cod_conf_email : server + '/pedirCodigoEmail',
  conf_email : server + '/confirmarEmail',
  jugadores: server + '/jugadores',
  registro: server + '/registro',
  partido: server + '/partidos',
  posicion: server + '/posicion',
  perfil: server + '/perfil',
  estadoJugador: server + '/estadoJugador',

  partidoxjugador: server + '/partidoxjugador',
  partidoxjugadorByIdPartido: server + '/partidoxjugadorByIdPartido'
};

@Injectable({
  providedIn: 'root'
})


export class HttpGralService {



  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }


  getDatas(url: string): Observable<any[]> {

    return this.http.get<any[]>(url).pipe(
      map(response => {
        if (response == null) {
          return null;
        }
        if (response['x-access-token'] != null) {
          this.authenticationService.refreshSecure(response);
        }
        return response['data'];

      })
    ); }

    getDataById(url: string, id: number): Observable<any> {

      return this.http.get<any>(`${url}/${id}`).pipe(
        map(response => {
          if (response == null) {
            return null;
          }
          if (response['x-access-token'] != null) {
            this.authenticationService.refreshSecure(response);
          }
          return response['data'];
        })
      );
    }

    updateData (url: string, obj: any): Observable<any> {
      return this.http.put(url, obj).pipe(
        map(response => {
          if (response == null) {
            return null;
          }
          if (response['x-access-token'] != null) {
            this.authenticationService.refreshSecure(response);
          }
          return response['data'];
        })
      );
    }

    addData (url: string, obj: any): Observable<any> {
      return this.http.post<any>(url, obj).pipe(
        map(response => {
          if (response == null) {
            return null;
          }
          if (response['x-access-token'] != null) {
            this.authenticationService.refreshSecure(response);
          }
          return response['data'];
        })
      );
    }

    deleteData (url: string, obj: any): Observable<any> {


    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: obj
    }

      return this.http.delete<any>(url, options).pipe(
        map(response => {
          if (response == null) {
            return null;
          }
          if (response['x-access-token'] != null) {
            this.authenticationService.refreshSecure(response);
          }
          return response['data'];
        })
      );
    }

    deleteDataById (url: string, id: number): Observable<any> {

      return this.http.delete<any>(`${url}/${id}`).pipe(
        map(response => {
          if (response == null) {
            return null;
          }
          if (response['x-access-token'] != null) {
            this.authenticationService.refreshSecure(response);
          }
          return response['data'];
        })
      );
    }

}
