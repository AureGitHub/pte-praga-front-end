import { Component, OnInit } from '@angular/core';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';

@Component({
  selector: 'app-detalle-estadisticas',
  templateUrl: './detalle-estadisticas.component.html',
  styleUrls: ['./detalle-estadisticas.component.css']
})
export class DetalleEstadisticasComponent implements OnInit {

  jugadorxestadistica: any;
  currentUser: any;
  constructor(
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }


   ngOnInit() {
    this.getJugadorEstadisticas();
  }
  getJugadorEstadisticas() {
    this.httpGralService.getDatas(apisUrl.jugadorResumenEstadisticas).subscribe(
      data => {
        this.jugadorxestadistica = data;
      });
  }

}
