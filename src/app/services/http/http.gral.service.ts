import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { AlertService } from '../components/alert.service';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

// const server='api';  // from memory
// const server = 'http://localhost:4000';     // from nodes js


const server = environment.apiUrl;
const prefix  = '/api/ver1';
export const apisUrl = {
  login : server + `${prefix}/login`,
  pedirCodigoForgetPass : server + '/pedirCodigoForgetPass',
  cambiarPasswordForget  : server + '/cambiarPasswordForget ',
  jugador_ConfirmarEmail : server + `${prefix}/jugadorconfirmar/email`,
  jugador_ConfirmarPassword : server + `${prefix}/jugadorconfirmar/password/public`,
  jugador_CambiarPasswordOlvidada : server + `${prefix}/jugador/cambiarpasswordOlvidada/public`,
  jugador_CambiarPassword : server + `${prefix}/jugador/cambiarpassword`,
  jugador: server + `${prefix}/jugador`,
  jugadorResumenPartidos: server + `${prefix}/jugador/ResumenPartidos`,
  registro: server + '/registro',
  partido: server + `${prefix}/partido`,
  partidoCerrar : server + `${prefix}/partido/cerrar`,
  partidoAbrir : server + `${prefix}/partido/abrir`,
  partidoFinalizar : server + `${prefix}/partido/finalizar`,
  partidoDesFinalizar : server + `${prefix}/partido/desfinalizar`,
  partidoPublic: server + `${prefix}/partido/public`,
  codigos: server + `${prefix}/codigos/public`,


  partidoxjugador: server + `${prefix}/partidoxjugador`,
  partidoxjugadorByIdPartido: server + `${prefix}/partidoxjugador`,
  partidoxjugadorAddToPartido: server + `${prefix}/partidoxjugador/AddToPartido`,
  partidoxjugadorCreateAny: server +  `${prefix}/partidoxjugador/CreateAny`,
  partidoxpistaxjugador: server + `${prefix}/partidoxpistaxjugador`,
  partidoxpistaxjugadorParejaAleatorio : server + `${prefix}/partidoxpistaxjugador/ParejasAleatorio`,
  partidoxpistaxjugadorParejasPorRanking : server + `${prefix}/partidoxpistaxjugador/ParejasPorRanking`,
  hacerparejas : server + '/hacerparejas',
  partidosxpistaxmarcador : server + `${prefix}/partidoxpistaxmarcador`,
  jugadorxresultado : server + `${prefix}/jugadorxresultado`,
  jugadorxranking : server + `${prefix}/jugadorxranking`,
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
    };

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
