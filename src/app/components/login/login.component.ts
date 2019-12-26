import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/components/alert.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { first } from 'rxjs/operators';
import form_login from 'src/app/forms/form-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;

  public loginForm: FormGroup;

  formDataTemplate = form_login;
  formData = {id: 666, email: 'admin11@a.es', password : '123456'};


  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,

  ) { }

  ngOnInit() {


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
