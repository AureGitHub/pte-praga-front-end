import { Component, OnInit, Input } from '@angular/core';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';

@Component({
  selector: 'app-gestion-jugadores',
  templateUrl: './gestion-jugadores.component.html',
  styleUrls: ['./gestion-jugadores.component.css']
})
export class GestionJugadoresComponent implements OnInit {

  @Input() idpartido: any;
  @Input() currentUser: any;
  @Input() idpartido_estado: any;
  @Input() partido: any;

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
    this.getJugadores();
  }

  SetJugadoresEnLst(jugadores) {
    this.jugadoresSeleccionados = jugadores.filter(a => a.idpartidoxjugador_estado === 1);
    this.jugadoresSuplentes = jugadores.filter(a => a.idpartidoxjugador_estado === 2);
    this.seleccionadosCount = this.jugadoresSeleccionados.length;
    this.suplentesCount = this.jugadoresSuplentes.length;

    this.partido.jugadoresapuntados = jugadores.length;

  }

  getJugadores() {
    this.httpGralService.getDataById(apisUrl.partidoxjugadorByIdPartido, this.idpartido)
    .subscribe(jugadores =>  this.SetJugadoresEnLst(jugadores));
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
    this.httpGralService.getDataById(apisUrl.partidoxjugadorAddToPartido, this.idpartido).subscribe(
      jugadores => {
        this.newJugadores = jugadores;
      });

  }

  AddNewJugadores() {

    const formualio = { idpartido: this.idpartido, JugadoresAdd: this.selectJugadores };

    this.httpGralService.addData(apisUrl.partidoxjugadorCreateAny, formualio)
    .subscribe(jugadores => {
      this.displayDialog = false;
      this.SetJugadoresEnLst(jugadores);
    } );
  }





}
