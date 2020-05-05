import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';

@Component({
  selector: 'app-gestion-pistas',
  templateUrl: './gestion-pistas.component.html',
  styleUrls: ['./gestion-pistas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestionPistasComponent implements OnInit {

  @Input() currentPartido: any;
  partido: any;
  partidoxpista = [];
  constructor(
    private httpGralService: HttpGralService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.currentPartido.subscribe(data => {
      this.partido = data;
      this.getPartidoxPista();
    });
  }

  getPartidoxPista() {
    this.httpGralService.getDataById(apisUrl.partidoxpistaxjugador, this.partido.id).subscribe(
      pxp => {
        this.partidoxpista = pxp;
      });
  }

  setMarcador(a, b) {}
}
