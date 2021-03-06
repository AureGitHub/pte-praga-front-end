import { Component, OnInit, Input } from '@angular/core';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-gestion-jugadores',
  templateUrl: './gestion-jugadores.component.html',
  styleUrls: ['./gestion-jugadores.component.css']
})
export class GestionJugadoresComponent implements OnInit {


  @Input() currentUser: any;
  @Input() currentPartido: any;
  @Input() currentPartidoSubject: BehaviorSubject<any>;
   partido: any;

  jugadoresSeleccionados: [];
  seleccionadosCount: any;
  jugadoresSuplentes: [];
  suplentesCount: any;

  displayDialog = false;

  newJugadores = [];
  selectJugadores = [];

  constructor(
    private httpGralService: HttpGralService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
  ) {
  }


  ngOnInit() {

    this.currentPartido.subscribe(data => {
      this.partido = data;
      this.getJugadores();
    });
  }

  getJugadores() {
    this.httpGralService.getDataById(apisUrl.partidoxjugadorByIdPartido, this.partido.id)
    .subscribe(jugadores =>  this.SetJugadoresEnLst(jugadores));
  }

  SetJugadoresEnLst(jugadores) {
    this.jugadoresSeleccionados = jugadores.filter(a => a.idpartidoxjugador_estado === 1);
    this.jugadoresSuplentes = jugadores.filter(a => a.idpartidoxjugador_estado === 2);
    this.seleccionadosCount = this.jugadoresSeleccionados.length;
    this.suplentesCount = this.jugadoresSuplentes.length;

    this.partido.jugadoresapuntados = jugadores.length;

  }



  borrarJugador(jugador) {
    this.confirmationService.confirm({
      message: `Vas a borrar al jugador ${jugador.alias}   ¿Deseas continuar?`,
      header: 'Borrar partido',
      icon: 'pi pi-remove',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.deleteDataById(apisUrl.partidoxjugador,  jugador.idpartidoxjugador).subscribe(
            jugadores => {
              this.SetJugadoresEnLst(jugadores);
            });
      },
      reject: () => {
      }
    });
  }

  showDialogToAddJugador() {
    this.selectJugadores = [];
    this.displayDialog = true;
    this.httpGralService.getDataById(apisUrl.partidoxjugadorAddToPartido, this.partido.id).subscribe(
      jugadores => {
        this.newJugadores = jugadores;
      });

  }

  AddNewJugadores() {

    const formualio = { idpartido: this.partido.id, JugadoresAdd: this.selectJugadores };

    this.httpGralService.addData(apisUrl.partidoxjugadorCreateAny, formualio)
    .subscribe(jugadores => {
      this.displayDialog = false;
      this.SetJugadoresEnLst(jugadores);
    } );
  }

  porPosicion(a, b) {
    if (a.idposicion > b.idposicion) { return 1; }
    if (b.idposicion > a.idposicion) { return -1; }
    return 0;
  }

  porCoef(a, b) {
    if (parseFloat(a.coeficiente)  > parseFloat(b.coeficiente)) { return -1; }
    if (parseFloat(a.coeficiente) > parseFloat(b.coeficiente)) { return 1; }

    return 0;
  }

  porFecha(a, b) {
    if (a.created_at > b.created_at) { return 1; }
    if (b.created_at > a.created_at) { return -1; }
    return 0;
  }

  OrdenaByCoef() {
    this.jugadoresSeleccionados.sort(this.porCoef);
    this.jugadoresSeleccionados.sort(this.porPosicion);
  }
  OrdenaByFecha() {
    this.jugadoresSeleccionados.sort(this.porFecha);
    
  }

}
