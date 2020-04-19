import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import form_login from 'src/app/forms/form-login';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import form_email from 'src/app/forms/form_email';
import form_newpass from 'src/app/forms/form_newpass';
import { AlertService } from 'src/app/services/components/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  display: boolean = false;

  @ViewChild('login') myForm: MyFormComponent;

  formDataTemplate = form_login;

  formDataTemplateEmail = form_email;

  formDataTemplateNewPass = form_newpass;

  urlLogin = apisUrl.login;


  constructor(
    private router: Router,
    private httpGralService: HttpGralService,
    private alertService: AlertService

  ) { }

  ngOnInit() {

  }

  doFake() {

    this.myForm.SetFormData({id: 666, email: 'aure@gmail.es', password : 'jas11jas11'});
      }


      showDialog() {
        this.display = true;
    }


  public submit = (formulario) => {
    this.router.navigate(['/']);
  }

  public submitEmail = (formulario) => {


    this.httpGralService.addData(apisUrl.pedirCodigoForgetPass, formulario)
          .subscribe(dataServer => {
            this.alertService.success('Codigo solicitado correctamente. En breve estará en su email');
          });

  }

  public submitNewPass = (formulario) => {


    this.httpGralService.addData(apisUrl.cambiarPasswordForget, formulario)
          .subscribe(dataServer => {
            this.alertService.success('Su password ha sido modificada correctamente');
            this.display=false;
            
          });

  }


  

}
