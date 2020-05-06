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
  tanteo = [];
  selectTanteoPar1: any;
  selectTanteoPar2: any;

  displayDialog = false;

  pxpSelectMarcador: any;
  setSelectMarcador: any;


  constructor(
    private httpGralService: HttpGralService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.setTantao();
    this.currentPartido.subscribe(data => {
      this.partido = data;
      this.getPartidoxPista();
    });
  }

  setTantao() {
    for (let i = 0; i <= 10; i++) {
      this.tanteo.push({label: i === 0 ? '0' : i.toString(), value: i});
    }

  }

  getPartidoxPista() {
    this.httpGralService.getDataById(apisUrl.partidoxpistaxjugador, this.partido.id).subscribe(
      pxp => {
        this.partidoxpista = pxp;
      });
  }

  setMarcador(pxp, set) {

    this.pxpSelectMarcador = pxp;
    this.setSelectMarcador = set;
    this.displayDialog = true;
    // this.pxp_setMarcador = pxp;
    // this.numSet = set;
    // this.displayDialog = true;
    // this.marcadorPartido = `${this.pxp_setMarcador['nombre']}    set ${set}` ;

    // this.selectTanteoPar1 = this.pxp_setMarcador[`set${this.numSet}`] ? this.pxp_setMarcador[`set${this.numSet}`].juegospareja1 : 0;
    // this.selectTanteoPar2 = this.pxp_setMarcador[`set${this.numSet}`] ? this.pxp_setMarcador[`set${this.numSet}`].juegospareja2 : 0;

}

saveSet() {
  if (!(this.selectTanteoPar1 && this.selectTanteoPar2)) {
    this.alertService.error('Tiene que introducir el marcador para los dos jugadores');
    return;
  }
}


}
