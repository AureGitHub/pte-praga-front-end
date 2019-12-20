import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/components/alert.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;

  public loginForm: FormGroup;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,

  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email': new FormControl('',  [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.compose([Validators.minLength(6)])]),
   });

   this.loginForm.reset({email: 'admin@a.es', password : '123456'});

  }


  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onsubmit = () => {
    if (this.loginForm.valid) {

        this.alertService.clear();

        const user = {};
        user['email'] = this.loginForm.controls['email'].value;
        user['password'] = this.loginForm.controls['password'].value;


        this.authenticationService.login(user)
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

}
