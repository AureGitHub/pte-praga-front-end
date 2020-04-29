import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';


@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  currentUser: any;
  partido: Partido = null;
  partidoxpistaxranking = [];
  partidosxpistas = [];
  pistasArray = [];
  turnosArray = [];

  drives = [];
  reves = [];
  suplentes = [];
  idpartido: any;
  idpartido_estado: any;

 
  selectdrive: any;
  selectreves: any;
  selectsuplente: any;
  widthButton = {'width': '20%'};

  @ViewChild('divPistas') myDiv: ElementRef;

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
            this.getPartidoxPista();
          });
      },
      reject: () => {
      }
    });
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;
        this.idpartido_estado = this.partido.idpartido_estado;
        this.getPartidoxPista();
        if (this.partido && this.partido['idpartido_estado'] === 3) {
          this.getPartidoxPistaXRanking();
        }
      });

  }
  getPartidoxPista() {
    this.httpGralService.getDataById(apisUrl.partidosxpistas, this.idpartido).subscribe(
      pxp => {
        this.pistasArray = [];
        this.partidosxpistas = pxp;
        for (let i = 1; i <= this.partido.pistas; i++) {
          this.pistasArray.push(i);
        }

        const maxTurno = Math.max.apply(Math, this.partidosxpistas.map(function(o) { return o.idturno; }));

        this.turnosArray = [];

        for (let i = 1; i <= maxTurno; i++) {
          this.turnosArray.push(i);
        }

      });
  }

  getPartidoxPistaXRanking() {
    this.httpGralService.getDataById(apisUrl.partidoxpistaxranking, this.idpartido).subscribe(
      pxpxr => {
        this.partidoxpistaxranking = pxpxr;
      });
  }


 

  borrar(formulario: any) {

    this.confirmationService.confirm({
      message: 'Vas a borrar a ' + formulario.alias + ' del partido  ¿Deseas borrarte?',
      header: 'Bórrate del partido',
      icon: 'pi pi-thumbs-down',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.httpGralService.deleteData(apisUrl.partidoxjugador,
          {
            idpartido: this.idpartido,
            idjugador: formulario.id,
            idpartidoxjugador_estado: formulario.idpartidoxjugador_estado
          }).subscribe(
            jugadores => {
              this.getPartidoxPista();
              this.selectreves = null;
              this.selectdrive = null;
              this.selectsuplente = null;
            });
      },
      reject: () => {
      }
    });


  }

  borrarReves() {
    this.borrar(this.selectreves);
  }

  borrarDrive() {
    this.borrar(this.selectdrive);
  }

  borrarSuplentes() {
    this.borrar(this.selectsuplente);
  }



}
