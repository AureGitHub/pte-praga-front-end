import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';


@Component({
  selector: 'detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  currentUser: any;
  partido: Partido = null;

  partidosxpistas = [];
  pistasArray = [];
  turnosArray = [];

  drives = [];
  reves = [];
  suplentes = [];
  idpartido: any;

  displayDialog = false;

  newJugadores = [];
  selectJugadores = [];
  selectdrive: any;
  selectreves: any;
  selectsuplente: any;

  @ViewChild('divPistas') myDiv: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.idpartido = this.route.snapshot.paramMap.get('id');
    this.getPartido();
  }


  hacerparejas() {
    this.httpGralService.getDataById(apisUrl.hacerparejas, this.idpartido).subscribe(
      parejas => {
        this.alertService.success('V.I.C.T.O.R. ha realizado los cáculos...');
        
        this.getPartidoxPista();

      });
  }

  getJugadores() {
    this.httpGralService.getDataById(apisUrl.partidoxjugadorByIdPartido, this.idpartido).subscribe(
      jugadores => {

        this.drives = jugadores.filter(a => a.idposicion === 1 && a.idpartidoxjugador_estado === 1);
        this.reves = jugadores.filter(a => a.idposicion === 2 && a.idpartidoxjugador_estado === 1);
        this.suplentes = jugadores.filter(a => a.idpartidoxjugador_estado === 2);
        this.partido.jugadoresapuntados = jugadores.length;

      });
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;
        this.getJugadores();
        this.getPartidoxPista();
      });

  }
  getPartidoxPista() {
    this.httpGralService.getDataById(apisUrl.partidosxpistas, this.idpartido).subscribe(
      pxp => {
        this.pistasArray = [];
        this.partidosxpistas = pxp;
        for (let i = 1; i <= this.partido.pistas; i++) {
          this.pistasArray.push(i);
        }

        const maxTurno = Math.max.apply(Math, this.partidosxpistas.map(function(o) { return o.idturno; }));

        this.turnosArray = [];

        for (let i = 1; i <= maxTurno; i++) {
          this.turnosArray.push(i);
        }

      });
  }

  showDialogToAddJugador() {
    this.selectJugadores = [];
    this.displayDialog = true;
    this.httpGralService.getDataById(apisUrl.partidoxjugadorAddByIdPartido, this.idpartido).subscribe(
      jugadores => {
        this.newJugadores = jugadores;
      });

  }

  AddNewJugadores() {

    const formualio = { idpartido: this.idpartido, JugadoresAdd: this.selectJugadores }

    this.httpGralService.addData(apisUrl.partidoxjugadorAddArray, formualio).subscribe(
      jugadores => {
        this.getJugadores();
        this.displayDialog = false;
      });
  }

  borrar(formulario: any) {

    this.confirmationService.confirm({
      message: 'Vas a borrar a ' + formulario.alias + ' del partido  ¿Deseas borrarte?',
      header: 'Bórrate del partido',
      icon: 'pi pi-thumbs-down',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.deleteData(apisUrl.partidoxjugador,
          {
            idpartido: this.idpartido,
            idjugador: formulario.id,
            idpartidoxjugador_estado: formulario.idpartidoxjugador_estado
          }).subscribe(
            jugadores => {
              this.getJugadores();
              this.selectreves = null;
              this.selectdrive = null;
              this.selectsuplente = null;
            });
      },
      reject: () => {
      }
    });


  }

  borrarReves() {
    this.borrar(this.selectreves);
  }

  borrarDrive() {
    this.borrar(this.selectdrive);
  }

  borrarSuplentes() {
    this.borrar(this.selectsuplente);
  }



}
