import { Component, OnInit } from '@angular/core';
import form_registro from 'src/app/forms/form_registro';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formDataTemplate = form_registro;
  constructor(
    private httpGralService: HttpGralService
  ) { }

  ngOnInit() {
    this.SetformDataTemplate();
  }

  SetformDataTemplate() {

    this.httpGralService.getDatas(apisUrl.posicion).subscribe(
      lstpos => {

        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idposicion' );
        itemTemplatePos.options = lstpos;

        this.httpGralService.getDatas(apisUrl.perfil).subscribe(
          lstperfil => {
            const itemTemplatePer = this.formDataTemplate.find(a => a.name === 'idperfil' );
            itemTemplatePer.options = lstperfil;


              });

      });
  }
  public submit = (formulario) => {


    // this.httpGralService.addData(apisUrl.login, formulario)
    //       .subscribe(dataServer => {
    //         this.authenticationService.login(dataServer);
    //         this.router.navigate(['/']);
    //       });

       

  }

}
