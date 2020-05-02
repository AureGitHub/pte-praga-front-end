import { Component, OnInit, ViewChild } from '@angular/core';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import form_detalle_jugador from 'src/app/forms/form_detalle_jugador';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/components/alert.service';
import { CombosService } from 'src/app/services/combos/combos.service';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.component.html',
  styleUrls: ['./detalle-jugador.component.css']
})
export class DetalleJugadorComponent implements OnInit {

  urlEntidad =  apisUrl.jugador;
  currentUser: User;

  @ViewChild(MyFormComponent)

  private myForm: MyFormComponent;

  formDataTemplate = form_detalle_jugador;

  constructor(
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private combosService: CombosService
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    } );
   }

  ngOnInit() {
    this.SetformDataTemplate();
    this.getDatosUser();
  }

  SetformDataTemplate() {

    this.combosService.getCombo('posicion').subscribe(
      data => {
        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idposicion' );
        itemTemplatePos.options = data;
    });
  }

  getDatosUser() {
    this.httpGralService.getDataById(apisUrl.jugador, this.currentUser.id).subscribe(
      user => {
        this.myForm.SetFormData(user);
      });

  }

  public submit = (formulario) => { };

}
