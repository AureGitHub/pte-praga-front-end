import { Component, OnInit } from '@angular/core';
import form_registro from 'src/app/forms/form_registro';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AlertService } from 'src/app/services/components/alert.service';
import { Router } from '@angular/router';
import { CombosService } from 'src/app/services/combos/combos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formDataTemplate = form_registro;
  constructor(
    private httpGralService: HttpGralService,
    private alertService: AlertService,
    private router: Router,
    private combosService: CombosService
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

    this.httpGralService.addData(apisUrl.registro, formulario)
          .subscribe(user => {
            if (user) {
                this.alertService.success('operacion ejecutada correctamente');
                this.router.navigate(['/login']);
            }
          });

    // this.httpGralService.addData(apisUrl.login, formulario)
    //       .subscribe(dataServer => {
    //         this.authenticationService.login(dataServer);
    //         this.router.navigate(['/']);
    //       });

  }

}
