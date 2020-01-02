import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { User } from 'src/app/models/user';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';
import form_user from 'src/app/forms/form-user';
import { MyFormComponent } from '../comun/my-form/my-form.component';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()],

})


export class UsersComponent implements OnInit {

  @ViewChild(MyFormComponent)

  private myForm: MyFormComponent;
  displayDialog: boolean;
  formDataTemplate = form_user;

  newUser: boolean;



  cols: any[];

  users: any[];


  constructor(
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private httpGralService: HttpGralService
    ) { }

    ngOnInit() {

      this.cols = [
        { field: 'alias', header: 'Alias' },
        { field: 'posicion', header: 'posicion' },
        { field: 'perfil', header: 'perfil' },
        { field: 'estado', header: 'estado' },
      ];

      this.getUsers();
      this.SetformDataTemplate();
      // this.getPosicion();
      // this.getPerfil();

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

            this.httpGralService.getDatas(apisUrl.estadoJugador).subscribe(
              lstestados => {
                const itemTemplatePer = this.formDataTemplate.find(a => a.name === 'idestado' );
                itemTemplatePer.options = lstestados;
    
    
                  });


              });

      });
  }

  getUsers() {
    this.httpGralService.getDatas(apisUrl.user).subscribe(
      data => {
        this.users = data;
      });
  }




  showDialogToAdd() {

    this.myForm.SetFormData({});
    this.newUser = true;
    this.displayDialog = true;

  }

  submit(formulario) {

      if (this.newUser) {
        this.httpGralService.addData(apisUrl.user, formulario)
          .subscribe(user => {
            if(user){
              this.displayDialog = false;
                this.getUsers();
                this.alertService.success('operacion ejecutada correctamente');
                
            }
            
          });
      } else {
        this.httpGralService.updateData(apisUrl.user, formulario)
          .subscribe(() => {
            this.getUsers();    
            this.alertService.success('operacion ejecutada correctamente');
            this.displayDialog = false;
          });
        }

  }

  delete(idUser) {
    this.displayDialog = false;
    this.confirmationService.confirm({
      message: '¿Desea borrar el usuario?',
      header: 'Borrado usuario',
      icon: 'pi pi-user-minus',
      accept: () => {
        this.httpGralService.deleteDataById(apisUrl.user, idUser)
        .subscribe(() => {
          this.alertService.success('operacion ejecutada correctamente');
          this.getUsers();
        });
      },
      reject: () => {
      }
  });
  }



  onRowSelect(event) {
    this.newUser = false;
    this.displayDialog = true;
    this.myForm.SetFormData(event.data);

  }

  cloneCar(u: User): User {
    const user = {};
    // tslint:disable-next-line:forin
    for (const prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }


}

