import { Component, OnInit, ViewChild } from '@angular/core';
import form_registro from 'src/app/forms/form_registro';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AlertService } from 'src/app/services/components/alert.service';
import { Router } from '@angular/router';
import { CombosService } from 'src/app/services/combos/combos.service';
import { ConfirmationService } from 'primeng/api';
import { MyFormComponent } from '../comun/my-form/my-form.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @ViewChild(MyFormComponent) myForm: MyFormComponent;
  urlEntidad =  `${apisUrl.jugador}/public`;

  formDataTemplate = form_registro;
  constructor(
    private httpGralService: HttpGralService,
    private alertService: AlertService,
    private router: Router,
    private combosService: CombosService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.SetformDataTemplate();
  }

  SetformDataTemplate() {
    this.combosService.getCombo('posicion').subscribe(
      data => {
        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idposicion' );
        itemTemplatePos.options = data;
    });
  }
  public submit = (formulario) => {

    this.confirmationService.confirm({
      rejectVisible: false,
      acceptLabel: 'OK',
      message: `Te has registrado correctamente. Se ha enviado un código a su email para finalizar el registro.
      Pulse OK  para confirmar su email.`,
      header: 'Registrado correctamente',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.router.navigate(['/confirm-email']);
      }
    });
  }

}
