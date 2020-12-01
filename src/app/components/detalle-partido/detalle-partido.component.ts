import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { form_partido } from 'src/app/forms/form-partido';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {


  items: MenuItem[];

  currentUser: any;
  partido: Partido = null;


  idpartido: any;
  idpartido_estado: any;
  selectdrive: any;
  selectreves: any;
  selectsuplente: any;
  widthButton = {'width': '20%'};

  @ViewChild('divPistas') myDiv: ElementRef;

  @ViewChild(MyFormComponent)
  private myForm: MyFormComponent;
  displayDialog: boolean;
  formDataTemplate = form_partido;
  urlEntidad =  apisUrl.partido;
  newPartido = false;

  propietarioOrAdmin = false;

  public currentPartido: Observable<any>;
  public currentPartidoSubject: BehaviorSubject<any>;


  constructor(
    private route: ActivatedRoute,
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private router: Router

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    if (window.innerWidth >= 700) {
      this.widthButton = {'width': '20%'};

    } else {
      this.widthButton = {'width': '90%'};

    }
  }

  ngOnInit() {
    this.idpartido = this.route.snapshot.paramMap.get('id');
    this.getPartido();
  }


  setItemsButtonAtion() {
    if (this.partido.abierto && this.propietarioOrAdmin) {
      this.items = [
        {label: 'Editar', icon: 'fa fa-2x fa-edit', command: () => {
          this.onEdit();
        }},
        {label: 'Cerrar', icon: 'fa fa-2x fa-close', command: () => {
          this.CerrarPartido();
        }},
        {label: 'Borrar', icon: 'fa fa-2x fa-eraser ', styleClass: 'rojo',  command: () => {
          this.BorrarPartido();
       }}
      ];
    } else if (this.partido.cerrado && this.propietarioOrAdmin) {
      if (this.currentUser.isAdmin) {
        this.items = [
          {label: 'Abrir', icon: 'fa fa-2x fa-folder-open-o', command: () => {
            this.AbrirPartido();
          }},
          {label: 'Finalizar', icon: 'fa fa-2x fa-smile-o', command: () => {
            this.FinalizarPartido();
           }},
          {label: 'Borrar', icon: 'fa fa-2x fa-eraser ', styleClass: 'rojo',  command: () => {
            this.BorrarPartido();
           }}
        ];
      } else {
        this.items = [
          {label: 'Finalizar', icon: 'fa fa-2x fa-smile-o', command: () => {
            this.FinalizarPartido();
           }},
          {label: 'Borrar', icon: 'fa fa-1x fa-eraser ', styleClass: 'rojo',  command: () => {
            this.BorrarPartido();
           }}
        ];
      }
    } else if (this.partido.finalizado && this.propietarioOrAdmin) {
      if (this.currentUser.isAdmin) {
        this.items = [
          {label: 'des-Finalizar', icon: 'fa fa-2x fa-smile-o', command: () => {
            this.DesFinalizarPartido();
           }},
          {label: 'Borrar', icon: 'fa fa-1x fa-eraser ', styleClass: 'rojo',  command: () => {
            this.BorrarPartido();
           }}
        ];
      } else {
        this.items = [
          {label: 'Borrar', icon: 'fa fa-1x fa-eraser ', styleClass: 'rojo',  command: () => {
            this.BorrarPartido();
           }}
        ];
      }
    }
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
      this.currentPartidoSubject = new BehaviorSubject<any>(data);
      this.currentPartido = this.currentPartidoSubject.asObservable();
        this.partido = data;
        this.propietarioOrAdmin = this.currentUser.isAdmin || this.currentUser.id === data.idcreador;

        this.setItemsButtonAtion();
        // this.currentPartidoSubject.next(data);
        this.idpartido_estado = this.partido.idpartido_estado;
      //  this.getPartidoxPistaxJugador();
        if (this.partido && this.partido['idpartido_estado'] === 3) {
      //    this.getPartidoxPistaXRanking();
        }
      });

  }

  BorrarPartido() {

    this.confirmationService.confirm({
      message: 'Vas a borrar el partido  ¿Deseas continuar?',
      header: 'Borrar partido',
      icon: 'pi pi-remove',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.deleteDataById(apisUrl.partido, this.partido.id).subscribe(
            jugadores => {
              this.router.navigate(['/']);
            });
      },
      reject: () => {
      }
    });

  }

  CerrarPartido() {

    this.confirmationService.confirm({
      message: 'Vas a cerrar el partido  ¿Deseas continuar?',
      header: 'Cerrar partido',
      icon: 'fa fa-2x fa-close',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.updateData(apisUrl.partidoCerrar, {id: this.partido.id } ).subscribe(
            partido => {
              this.partido = partido;
              this.alertService.success('partido cerrado');
              this.currentPartidoSubject.next(partido);
              this.setItemsButtonAtion();
            });
      },
      reject: () => {
      }
    });

  }


  AbrirPartido() {

    this.confirmationService.confirm({
      message: 'Vas a abrir el partido. TODOS LOS MARCADORES SE PERDERAN!!  ¿Deseas continuar?',
      header: 'Abrir partido',
      icon: 'fa fa-folder-open-o',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.updateData(apisUrl.partidoAbrir, {id: this.partido.id } ).subscribe(
            partido => {
              this.partido = partido;
              this.alertService.success('partido abierto');
              this.currentPartidoSubject.next(partido);
              this.setItemsButtonAtion();
            });
      },
      reject: () => {
      }
    });

  }

  FinalizarPartido() {

    this.confirmationService.confirm({
      message: 'Vas a finalizar el partido. Recuerda rellenar los marcadores antes de finalizar  ¿Deseas continuar?',
      header: 'Finalizar partido',
      icon: 'fa fa-2x fa-smile-o',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.updateData(apisUrl.partidoFinalizar, {id: this.partido.id }).subscribe(
            partido => {
              this.partido = partido;
              this.alertService.success('partido finalizado');
              this.currentPartidoSubject.next(partido);
              this.setItemsButtonAtion();
            });
      },
      reject: () => {
      }
    });

  }

  DesFinalizarPartido() {

    this.confirmationService.confirm({
      message: 'Vas a des-finalizar el partido. LA INFORMACIÓN DEL RANKING DE ESTE PARTIDO SE PERDERÁ ¿Deseas continuar?',
      header: 'Des-Finalizar partido',
      icon: 'fa fa-2x fa-smile-o',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.updateData(apisUrl.partidoDesFinalizar, {id: this.partido.id }).subscribe(
            partido => {
              this.partido = partido;
              this.alertService.success('partido des-finalizado');
              this.currentPartidoSubject.next(partido);
              this.setItemsButtonAtion();
            });
      },
      reject: () => {
      }
    });

  }


  hacerparejas() {

    this.confirmationService.confirm({
      message: 'V.I.C.T.O.R. va a rehacer las parejas. Se perderá la información actual  ¿Deseas continuar?',
      header: 'V.I.C.T.O.R.',
      icon: 'fa fa-1x fa-steam',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.getDataById(apisUrl.hacerparejas, this.idpartido).subscribe(
          parejas => {
            this.alertService.success('V.I.C.T.O.R. ha realizado los cáculos...');
           // this.getPartidoxPistaxJugador();
          });
      },
      reject: () => {
      }
    });
  }


  onEdit() {
    this.displayDialog = true;
    this.myForm.SetFormData(this.partido);
  }

  showDialogToAdd() {
    this.myForm.SetFormData({idcreador: this.currentUser.id});
    this.newPartido = true;
    this.displayDialog = true;

  }

  submitEdit(formulario) {
    this.displayDialog = false;
    this.partido = formulario;
    this.currentPartidoSubject.next(formulario);
}

hacerparejasAleatorio() {
  this.confirmationService.confirm({
    message: 'Vas a rehacer las parejas de forma aleatoria. Las parejas actuales se perderán. ¿Deseas continuar?',
    header: 'Parejas aleatoria',
    icon: 'fa fa-2x fa-steam',
    acceptLabel: 'Si',
    rejectLabel: 'No',
    accept: () => {
      this.httpGralService.getDataById(apisUrl.partidoxpistaxjugadorParejaAleatorio, this.partido.id).subscribe(
          partido => {
            this.alertService.success('parejas formadas!!');
            // desde aqui tengo que refrescar los partidoxpistaxmarcador !!!!
            // this.getPartido();
            this.currentPartidoSubject.next(this.partido);
          });
    },
    reject: () => {
    }
  });

}

hacerparejasPorRanking() {
  this.confirmationService.confirm({
    message: 'Vas a rehacer las parejas utilizando la clasificación del RANKING. Las parejas actuales se perderán. ¿Deseas continuar?',
    header: 'Parejas por Ranking (V.I.C.T.O.R.)',
    icon: 'fa fa-2x fa-steam',
    acceptLabel: 'Si',
    rejectLabel: 'No',
    accept: () => {
      this.httpGralService.getDataById(apisUrl.partidoxpistaxjugadorParejasPorRanking, this.partido.id).subscribe(
          partido => {
            this.alertService.success('parejas formadas!!');
            // desde aqui tengo que refrescar los partidoxpistaxmarcador !!!!
            // this.getPartido();
            this.currentPartidoSubject.next(this.partido);
          });
    },
    reject: () => {
    }
  });
}



}
