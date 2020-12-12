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
  draggedJugadorDeselect: any;

  displayDialogSelectPareja = false;

  jugadores = [] as  any;

  lstpartidoxpistaxjugador = [] as  any;

  parejas = [] as  any;


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

  SetListasPartido() {
    const totalParejas = this.partido.pistas * 2;
    for (let i = 1;  i <= totalParejas; i++) {
      this.parejas.push({id: i});
    }


    for (let turno = 1;  turno <= this.partido.turnos; turno++) {
      const pistas = [];
      for (let pista = 1;  pista <= this.partido.pistas; pista++) {
        pistas.push({id: pista});
      }
      this.lstpartidoxpistaxjugador.push({turno, pistas});

    }
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;
        this.getJugadores();
        this.SetListasPartido();
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

  dragStartJugadores(jugador) {
    this.draggedJugador = jugador;
  }
  dragEndJugadores(event) {
    this.draggedJugador = null;
  }

  dropParejas(id, posicion) {
    if (this.draggedJugador) {
        let pareja = this.parejas.find(a => a.id === id);
        if(pareja[posicion]){
          // si ya existe, lo mando a la lista de jugadores
          this.jugadores.push(pareja[posicion]);
        }
        pareja[posicion] = this.draggedJugador;
        this.jugadores = this.jugadores.filter(jug => jug['alias'] != this.draggedJugador.alias);
        this.draggedJugador = null;
    }
    if (this.draggedJugadorDeselect) {
       // de una pareja a otra
      // el que estoy moviendo
      let parejaMoving = this.parejas.find(a => a.id === this.draggedJugadorDeselect['id']); // el que ocupa el destino
      const JugadorMovido = parejaMoving[this.draggedJugadorDeselect['posicion']];
      parejaMoving[this.draggedJugadorDeselect['posicion']] = null;
      // el que ocupa el destino
      let parejaDestino = this.parejas.find(a => a.id === id); 
      if (parejaDestino) {
        // el destino está ocupado. Paso el que estaba al origen
        parejaMoving[this.draggedJugadorDeselect['posicion']]  = parejaDestino[posicion];
      }
      parejaDestino[posicion] = JugadorMovido;

    }
  }

  dropJugadores(event) {
    if (this.draggedJugadorDeselect) {
      let pareja = this.parejas.find(a => a.id === this.draggedJugadorDeselect['id']);
      this.jugadores.push(pareja[this.draggedJugadorDeselect['posicion']]);
      pareja[this.draggedJugadorDeselect['posicion']] = null;
      this.draggedJugadorDeselect = null;
    }
  }

  dragStartPareja(id, posicion) {
    this.draggedJugadorDeselect = {id, posicion};
  }
  dragEndPareja(){
    this.draggedJugadorDeselect = null;
  }

  showSelectPareja(turno, pista, pareja){
    this.displayDialogSelectPareja = true;
  }
}
