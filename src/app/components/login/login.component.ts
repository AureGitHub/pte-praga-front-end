import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import form_login from 'src/app/forms/form-login';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { apisUrl } from 'src/app/services/http/http.gral.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') myFormLogin: MyFormComponent;
  formDataTemplate = form_login;
  urlLogin = apisUrl.login;

  constructor(
    private router: Router,
  ) {
   }

  ngOnInit() {
  }

  doFake() {
    this.myFormLogin.SetFormData({id: 666, email: 'aure.desande@gmail.com', password : 'jas11jas11'});
  }

  public submit = (formulario) => {
    this.router.navigate(['/']);
  }
}
