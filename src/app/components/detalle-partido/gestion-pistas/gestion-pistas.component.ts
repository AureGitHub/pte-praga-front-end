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
    for (let i = 0; i <= 15; i++) {
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

    this.selectTanteoPar1 = this.pxpSelectMarcador[`set${this.setSelectMarcador}`] ?
    this.pxpSelectMarcador[`set${this.setSelectMarcador}`].juegospareja1 : 0;
    this.selectTanteoPar2 = this.pxpSelectMarcador[`set${this.setSelectMarcador}`] ?
    this.pxpSelectMarcador[`set${this.setSelectMarcador}`].juegospareja2 : 0;

}


puedeBorrarMarcador() {
  return this.pxpSelectMarcador &&  this.pxpSelectMarcador[`set${this.setSelectMarcador}`];
}

borrarSet() {
  this.httpGralService.deleteDataById(apisUrl.partidosxpistaxmarcador, this.pxpSelectMarcador[`set${this.setSelectMarcador}`].id).subscribe(
    pxpxm => {
      this.pxpSelectMarcador[`set${this.setSelectMarcador}`] = null;
      delete this.pxpSelectMarcador[`set${this.setSelectMarcador}`];
      this.displayDialog = false;
      this.alertService.success('Marcador borrado correctamente');
    });
}

saveSet() {
  if (this.selectTanteoPar1 == null || this.selectTanteoPar2 == null) {
    this.alertService.error('Tiene que introducir el marcador para las dos parejas');
    return;
  }

  const item = {
    idpartido: this.partido.id,
    idpartidoxpista: this.pxpSelectMarcador.id,
    idset: this.setSelectMarcador,
    juegospareja1: this.selectTanteoPar1,
    juegospareja2: this.selectTanteoPar2,
  };

  if (this.pxpSelectMarcador[`set${this.setSelectMarcador}`]) {
    // esta intentando una modificación
    item['id'] = this.pxpSelectMarcador[`set${this.setSelectMarcador}`].id;
    this.httpGralService.updateData(apisUrl.partidosxpistaxmarcador, item).subscribe(
      pxpxm => {
        this.refreshMarcador(pxpxm);
      });
  } else {
    this.httpGralService.addData(apisUrl.partidosxpistaxmarcador, item).subscribe(
      pxpxm => {
        this.refreshMarcador(pxpxm);
      });
  }
}

refreshMarcador(pxpxm) {
  const itempxpxj = this.partidoxpista.find( it => it.id === pxpxm.idpartidoxpista);
  if (!itempxpxj.hasOwnProperty(`set${pxpxm.idset}`)) {
    itempxpxj[`set${pxpxm.idset}`] = {id: pxpxm.id, juegospareja1: pxpxm.juegospareja1, juegospareja2: pxpxm.juegospareja2 };
  } else {
    itempxpxj[`set${pxpxm.idset}`]['juegospareja1'] = pxpxm.juegospareja1;
    itempxpxj[`set${pxpxm.idset}`]['juegospareja2'] = pxpxm.juegospareja2;
  }
  this.displayDialog = false;
  this.alertService.success('Marcador guardado correctamente');
}


}
