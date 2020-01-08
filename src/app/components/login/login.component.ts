import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import form_login from 'src/app/forms/form-login';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';

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
    private httpGralService: HttpGralService

  ) { }

  ngOnInit() {

  }

  doFake() {

    this.myForm.SetFormData({id: 666, email: 'auredecocccam@gmail.com', password : 'jas11jas11'});
      }




  public submit = (formulario) => {


    this.httpGralService.addData(apisUrl.login, formulario)
          .subscribe(dataServer => {
            // this.authenticationService.login(dataServer);
            this.router.navigate(['/']);
          });

  }

}
