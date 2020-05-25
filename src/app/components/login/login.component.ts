import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import form_login from 'src/app/forms/form-login';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { apisUrl } from 'src/app/services/http/http.gral.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  @ViewChild('login') myFormLogin: MyFormComponent;
  formDataTemplate = form_login;
  urlLogin = apisUrl.login;

  selectedRecuerdame = true;

  constructor(
    private router: Router,
    private cdRef:ChangeDetectorRef 
  ) {
   }

  ngOnInit() {

  }

  ngAfterViewChecked(){
    this.selectedRecuerdame = Boolean(localStorage.getItem('selectedRecuerdame'));
    this.myFormLogin.SetFormData({ email: localStorage.getItem('log_email'), password : localStorage.getItem('log_pass')});
    this.cdRef.detectChanges();
  }

  public submit = (formulario) => {
    if (this.selectedRecuerdame){
      localStorage.setItem('selectedRecuerdame', String(this.selectedRecuerdame));
      localStorage.setItem('log_email', this.myFormLogin.GetValue('email'));
      localStorage.setItem('log_pass', this.myFormLogin.GetValue('password'));
    }
    this.router.navigate(['/']);
  }
}
