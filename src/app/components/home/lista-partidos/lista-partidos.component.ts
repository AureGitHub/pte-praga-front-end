import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';


import { DatePipe } from '@angular/common';
import { Partido } from 'src/app/models/partido';
import { User } from 'src/app/models/user';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';





@Component({
  selector: 'app-lista-partidos',
  templateUrl: './lista-partidos.component.html',
  styleUrls: ['./lista-partidos.component.css']
})
export class ListaPartidosComponent implements OnInit {

  public loading = false;

  partidos: Partido[] = [];

  selectedPartido: Partido;

    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    currentUser: User;

  constructor(
    private httpGralService: HttpGralService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
  
    private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    getPartidos(){

      let partidos_: Partido[] = [];



      this.httpGralService.getDatas(apisUrl.partido).subscribe(
      data => {
        partidos_ = data;

        partidos_.sort(function(a, b){
        var keyA = new Date(a.dia),
            keyB = new Date(b.dia);
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });


        this.httpGralService.getDatas(apisUrl.partidoxjugador).subscribe(
        data =>
        {
          partidos_.forEach(
            partido =>
            {

              partido.dia = this.datePipe.transform(new  Date(partido.dia), 'dd-MM-yyyy');

              const jugadorespartido = data.filter(a => a.idpartido === partido.id);
              if (this.currentUser) {

                const partidoxjugador = jugadorespartido.find(a => a.idjugador === this.currentUser.id);
                partido.idpartidoxjugador =  partidoxjugador  ? partidoxjugador.id : null;

                partido.esCreador = partido.idcreador === this.currentUser.id;
              } else {
                partido.esCreador = false;
              }
            }
            );

            this.partidos = partidos_;

        }
      );

      });
  }
  ngOnInit() {
    this.getPartidos();

    this.sortOptions = [
      {label: 'Nombre', value: 'nombre'},
      {label: 'email', value: 'email'}
  ];
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

Apuntate(partido: Partido){

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

Borrate(partido: Partido){


  this.confirmationService.confirm({
    message: 'Te vas a borrar del partido ' + partido.dia + ' '  + partido.hora + ' ¿Deseas borrarte?',
    header: 'Bórrate del partido',
    icon: 'pi pi-thumbs-down',
    acceptLabel: 'Si',
    rejectLabel: 'No',
    accept: () => {
      this.httpGralService.deleteDataById(apisUrl.partidoxjugador, partido.idpartidoxjugador).subscribe(
        result => {
          this.getPartidos();
      });
    },
    reject: () => {
    }
});



}






}
