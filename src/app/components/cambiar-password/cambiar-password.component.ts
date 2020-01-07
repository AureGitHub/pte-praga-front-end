import { Component, OnInit } from '@angular/core';
import form_pass_confim from 'src/app/forms/form_pass_confim';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AlertService } from 'src/app/services/components/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  formDataTemplate = form_pass_confim;

  constructor(
    private httpGralService: HttpGralService,
    private alertService: AlertService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  public submit = (formulario) => {

    this.httpGralService.addData(apisUrl.cambiar_password, formulario)
          .subscribe(sal => {
            if (sal) {
                this.alertService.success('operacion ejecutada correctamente');
                this.router.navigate(['/']);
            }
          });

  }

}
