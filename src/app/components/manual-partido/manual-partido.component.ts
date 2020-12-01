import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { HttpGralService, apisUrl  } from 'src/app/services/http/http.gral.service';

@Component({
  selector: 'app-manual-partido',
  templateUrl: './manual-partido.component.html',
  styleUrls: ['./manual-partido.component.css']
})
export class ManualPartidoComponent implements OnInit {
  [x: string]: any;

  currentUser: any;
  partido: Partido = null;
  idpartido: any;
  draggedJugador: any;

  jugadores = [] as  any;
  jugadoresSelect = [] as  any;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private httpGralService: HttpGralService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.idpartido = this.route.snapshot.paramMap.get('id');
    this.getPartido();
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;
        this.getJugadores();
      });

  }

  porCoef(a, b) {
    if (parseFloat(a.coeficiente)  > parseFloat(b.coeficiente)) { return -1; }
    if (parseFloat(a.coeficiente) > parseFloat(b.coeficiente)) { return 1; }

    return 0;
  }
  getJugadores() {
    this.httpGralService.getDataById(apisUrl.partidoxjugadorByIdPartido, this.partido.id)
    .subscribe(jugadoresAll =>  {
        this.jugadores = jugadoresAll.filter(a => a.idpartidoxjugador_estado === 1);
        this.jugadores.sort(this.porCoef);
      }
      );
  }

  dragStart(jugador) {
    this.draggedJugador = jugador;
  }
  dragEnd(event) {
    this.draggedJugador = null;
  }

  drop(event) {
    if (this.draggedJugador) {
        this.jugadoresSelect.push(this.draggedJugador);
        this.jugadores = this.jugadores.filter(jug => jug['alias'] != this.draggedJugador.alias);
        this.draggedProduct = null;
    }
  }

}
