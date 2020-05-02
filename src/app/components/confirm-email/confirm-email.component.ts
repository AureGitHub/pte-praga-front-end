import { Component, OnInit } from '@angular/core';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AlertService } from 'src/app/services/components/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { User } from 'src/app/models/user';

import validator from 'validator';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  currentUser: User;
  ButtonAsk = false;
  ButtonConf = false;
  CodConfirmacion: any;
  VerPanelConfirmacion = false;
  constructor(

    private httpGralService: HttpGralService,
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,

  ) {

    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    } );

  }

  ngOnInit() {
  }

  doPedirCodigo() {
    this.httpGralService.getDatas(apisUrl.ask_cod_conf_email)
    .subscribe(
      sal => {
      if (sal) {
          this.alertService.success('Se ha enviado el código de confirmación a su correo (' + this.currentUser.email + ')' );
      }
    },
    error => {
    });
  }

  doEnviarCodigo() {
    if (!validator.isUUID(this.CodConfirmacion)) {
      this.alertService.error('Código con formato incorrecto (no es un UUID)', false, 3000 );
      return;
    }

    this.ButtonConf = true;
    this.httpGralService.addData(apisUrl.conf_email, {codConfirmEmail: this.CodConfirmacion})
    .subscribe(sal => {
      this.ButtonConf = false;
      if (sal) {
          this.alertService.success('Su correo ' + this.currentUser.email + ' se ha confirmado' );
          this.router.navigate(['/']);
      } else {
        this.alertService.error('Código de confirmación incorrecto', false, 3000 );
      }
    },
    error => {
      this.ButtonConf = false;
    }
    );


  }

}
