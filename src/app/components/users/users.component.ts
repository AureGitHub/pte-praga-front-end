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

  users: User[];


  constructor(
    private confirmationService: ConfirmationService,
    private httpGralService: HttpGralService,
    private alertService: AlertService,
    ) { }

    ngOnInit() {

      this.getUsers();
      // this.getPosicion();
      // this.getPerfil();
      this.cols = [
        { field: 'alias', header: 'Alias' },
        { field: 'idposicion', header: 'idposicion' },
        { field: 'idperfil', header: 'idperfil' },
      ];
    }


  getUsers() {
    this.httpGralService.getDatas(apisUrl.user).subscribe(
      data => {
        this.users = data;
      });
  }

  // getPosicion() {
  //   this.httpGralService.getDatas(apisUrl.posicion).subscribe(
  //     data => {
  //       data.forEach(item => {
  //         this.lstPosicion.push({label:item.descripcion, value:item.id});
  //       })
  //     });
  // }

  // getPerfil() {
  //   this.httpGralService.getDatas(apisUrl.perfil).subscribe(
  //     data => {

  //       data.forEach(item => {
  //         this.lstPerfil.push({label:item.descripcion, value:item.id});
  //       })

  //     });
  // }






  showDialogToAdd() {

    this.myForm.SetFormData({});
    this.newUser = true;
    this.displayDialog = true;

  }

  submit(formulario) {

      if (this.newUser) {
        this.httpGralService.addData(apisUrl.user, formulario)
          .subscribe(user => {
            this.users.push(user);
            this.displayDialog = false;
          });
      } else {
        this.httpGralService.updateData(apisUrl.user, formulario)
          .subscribe(() => {
            const findUserInList = this.users.find(item => item.id === formulario.id);
            const index = this.users.indexOf(findUserInList);
            this.users[index] = formulario;
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

    // Aqui hay que mandar los datros al usuario

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

