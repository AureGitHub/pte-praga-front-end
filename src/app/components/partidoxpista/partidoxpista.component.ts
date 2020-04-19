import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/services/components/alert.service';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';

@Component({
  selector: 'app-partidoxpista',
  templateUrl: './partidoxpista.component.html',
  styleUrls: ['./partidoxpista.component.css']
})
export class PartidoxpistaComponent implements OnInit {


  @Input() idpartido: any;
  @Input() partidosxpistas: [];
  @Input() pistasArray: Array<number> = [];
  @Input() turnosArray: Array<number> = [];

  displayDialog = false;

  tanteo = [];
  selectTanteoPar1: any;
  selectTanteoPar2: any;

  marcadorPartido: any;


  pxp: any;
  pxp_setMarcador: any;
  numSet: any;

  constructor(
    private alertService: AlertService,
    private httpGralService: HttpGralService,
  ) {

    this.setTantao();



  }

  ngOnInit() {

  }

  setTantao() {
    for (let i = 0; i <= 10; i++) {
      this.tanteo.push({label: i === 0 ? '0' : i, value: i});
    }

  }


  setMarcador(pxp, set) {

      this.pxp_setMarcador = pxp;
      this.numSet = set;
      this.displayDialog = true;
      this.marcadorPartido = `${this.pxp_setMarcador['nombre']}    set ${set}` ;

      this.selectTanteoPar1 = this.pxp_setMarcador[`set${this.numSet}`] ? this.pxp_setMarcador[`set${this.numSet}`].juegospareja1 : 0;
      this.selectTanteoPar2 = this.pxp_setMarcador[`set${this.numSet}`] ? this.pxp_setMarcador[`set${this.numSet}`].juegospareja2 : 0;

  }

  saveSet() {
    if (!(this.selectTanteoPar1 && this.selectTanteoPar2)) {
      this.alertService.error('Tiene que introducir el marcador para los dos jugadores');
      return;
    }

    const form = {
      id: this.pxp_setMarcador[`set${this.numSet}`] ? this.pxp_setMarcador[`set${this.numSet}`].id : null,
      idpartido: this.idpartido,
      idpartidoxpista : this.pxp_setMarcador['id'] ,
      idset: this.numSet,
      juegospareja1: this.selectTanteoPar1,
      juegospareja2: this.selectTanteoPar2
    };

    if (form.id) {
      this.httpGralService.updateData(apisUrl.partidosxpistaxmarcador, form).subscribe(
        partidosxpistaxmarcado => {
          this.updateMarcadorEnLista(partidosxpistaxmarcado);
        });
    } else {
      this.httpGralService.addData(apisUrl.partidosxpistaxmarcador, form).subscribe(
        partidosxpistaxmarcado => {
          this.updateMarcadorEnLista(partidosxpistaxmarcado);
        });
    }
  }

  updateMarcadorEnLista(partidosxpistaxmarcado) {
    this.alertService.success('Set guardado correctamente');
    this.displayDialog = false;
    let pxpLocal: any;
    pxpLocal = this.partidosxpistas.find(a => a['id'] === this.pxp_setMarcador['id']);
    if (pxpLocal) {
      pxpLocal[`set${this.numSet}`] = partidosxpistaxmarcado;
    }
  }


}

