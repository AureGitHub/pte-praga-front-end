import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { ConfirmationService } from 'primeng/api';
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


  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {

        this.currentPartidoSubject = new BehaviorSubject<any>(data);
      this.currentPartido = this.currentPartidoSubject.asObservable();

        this.partido = data;
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
        this.httpGralService.getDataById(apisUrl.partidos_cierre, this.partido.id).subscribe(
            partido => {
              this.alertService.success('partido cerrado');
              this.getPartido();
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
        this.httpGralService.getDataById(apisUrl.partidos_finaliza, this.partido.id).subscribe(
            partido => {
              this.alertService.success('partido finalizado');
              this.getPartido();
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


  onEdit(formulario) {
    this.displayDialog = true;
    this.myForm.SetFormData(formulario);
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


}
