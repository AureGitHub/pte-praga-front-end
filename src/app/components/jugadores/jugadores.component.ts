import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { User } from 'src/app/models/user';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';
import { MyFormComponent } from '../comun/my-form/my-form.component';
import form_jugador from 'src/app/forms/form_jugador';
import { CombosService } from 'src/app/services/combos/combos.service';




@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
  animations: [routerTransition()],

})


export class JugadoresComponent implements OnInit {

  @ViewChild(MyFormComponent)

  private myForm: MyFormComponent;
  displayDialog: boolean;
  formDataTemplate = form_jugador;
  urlEntidad =  apisUrl.jugador;

  newUser: boolean;



  cols: any[];

  users: any[];


  constructor(
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private httpGralService: HttpGralService,
    private combosService: CombosService
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

    this.combosService.getCombo('posicion').subscribe(
      data => {
        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idposicion' );
        itemTemplatePos.options = data;
    });

    this.combosService.getCombo('perfil').subscribe(
      data => {
        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idperfil' );
        itemTemplatePos.options = data;
    });

    this.combosService.getCombo('jugadorestado').subscribe(
      data => {
        const itemTemplatePos = this.formDataTemplate.find(a => a.name === 'idestado' );
        itemTemplatePos.options = data;
    });

  }

  getUsers() {
    this.httpGralService.getDatas(apisUrl.jugador).subscribe(
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

    // intentar mejorar no ir a BD

    this.displayDialog = false;
    if (this.newUser) {
      this.users.push(formulario);

      this.users.sort((a, b) => (a.alias > b.alias) ? 1 : -1);

    } else {
      this.getUsers();
    }


      // if (this.newUser) {
      //   this.httpGralService.addData(apisUrl.jugador, formulario)
      //     .subscribe(user => {
      //       if (user) {
      //         this.displayDialog = false;
      //           this.getUsers();
      //           this.alertService.success('Se ha creado el usuario. Contraseña: 123456. DEBE CAMBIARLA');
      //       }

      //     });
      // } else {
      //   this.httpGralService.updateData(apisUrl.jugador, formulario)
      //     .subscribe(() => {
      //       this.getUsers();
      //       this.alertService.success('operacion ejecutada correctamente');
      //       this.displayDialog = false;
      //     });
      //   }

  }

  delete(idUser) {
    this.displayDialog = false;
    this.confirmationService.confirm({
      message: '¿Desea borrar el usuario?',
      header: 'Borrado usuario',
      icon: 'pi pi-user-minus',
      accept: () => {
        this.httpGralService.deleteDataById(apisUrl.jugador, idUser)
        .subscribe((idBorrado) => {
          this.alertService.success('operacion ejecutada correctamente');
          this.users = this.users.filter(a => a.id !== idBorrado);
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

