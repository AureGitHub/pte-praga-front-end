import { Component, OnInit } from '@angular/core';
import form_passCambiar from 'src/app/forms/form_passCambiar';
import { apisUrl } from 'src/app/services/http/http.gral.service';
import { AlertService } from 'src/app/services/components/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  formDataTemplate = form_passCambiar;
  urlJugadorCambiarPass = apisUrl.jugador_CambiarPassword;

  constructor(
    private alertService: AlertService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  public submit = (formulario) => {
    this.alertService.success('Contraseña cambiada correctamente');
    this.router.navigate(['/detalle-jugador']);
  }

}
