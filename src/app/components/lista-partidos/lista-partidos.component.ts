import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';

import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';

import { form_partido } from 'src/app/forms/form-partido';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { AlertService } from 'src/app/services/components/alert.service';

@Component({
  selector: 'app-lista-partidos',
  templateUrl: './lista-partidos.component.html',
  styleUrls: ['./lista-partidos.component.css']
})
export class ListaPartidosComponent implements OnInit {

  @ViewChild(MyFormComponent)
  private myForm: MyFormComponent;
  displayDialog: boolean;
  formDataTemplate = form_partido;
  urlEntidad =  apisUrl.partido;
  newPartido = false;

  public loading = false;

  partidos: any[] = [];

  selectedPartido: any;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    currentUser: any;

  constructor(
    private httpGralService: HttpGralService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
      this.getPartidos();
      this.sortOptions = [
        {label: 'Nombre', value: 'nombre'},
        {label: 'email', value: 'email'}
    ];
    }

        getPartidos() {
      this.httpGralService.getDatas(apisUrl.partidoPublic).subscribe(
      data => {
        this.partidos = data;
      },
      error => {
      }
      );
  }

    showDialogToAdd() {
      this.myForm.SetFormData({idcreador: this.currentUser.id});
      this.newPartido = true;
      this.displayDialog = true;

    }


    submit(formulario) {
      this.getPartidos();
      this.displayDialog = false;
  }









  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onDialogHide() {
    this.selectedPartido = null;
}

Apuntate(partido: any) {

  this.confirmationService.confirm({
    message: '¿Te vas a apuntar al partido. Continuar?',
    header: 'Apuntarse al partido',
    icon: 'pi pi-thumbs-up',
    accept: () => {
      this.httpGralService.addData(apisUrl.partidoxjugador, {idjugador: this.currentUser.id, idpartido: partido.id }).subscribe(
        result => {
          this.getPartidos();
      });
    },
    reject: () => {
    }
});

}

Borrate(partido: any) {


  this.confirmationService.confirm({
    message: 'Te vas a borrar del partido ' + partido.dia + ' '  + partido.hora + ' ¿Deseas borrarte?',
    header: 'Bórrate del partido',
    icon: 'pi pi-thumbs-down',
    acceptLabel: 'Si',
    rejectLabel: 'No',
    accept: () => {
      this.httpGralService.deleteDataById(apisUrl.partidoxjugador,  partido.idpartidoxjugador ).subscribe(
        result => {
          this.getPartidos();
      });
    },
    reject: () => {
    }
});



}






}
