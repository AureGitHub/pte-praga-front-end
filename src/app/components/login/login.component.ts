import { Component, OnInit, ViewChild } from '@angular/core';


import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/components/alert.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { first } from 'rxjs/operators';
import form_login from 'src/app/forms/form-login';
import { MyFormComponent } from '../comun/my-form/my-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(MyFormComponent)

  private myForm: MyFormComponent;

  formDataTemplate = form_login;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,

  ) { }

  ngOnInit() {


  }

  ngAfterViewChecked() {

    this.myForm.SetFormData({id: 666, email: 'admin@a.es', password : '123456'});
      }




  public submit = (formulario) => {

    this.authenticationService.login(formulario)
        .pipe(first())
        .subscribe(
            data => {
              if (data) {
                this.router.navigate(['/']);
              } else {
              this.alertService.error('usuario/password incorrecto');
              }
            });

  }

}
