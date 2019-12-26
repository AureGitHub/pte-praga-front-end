import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { User } from 'src/app/models/user';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/components/alert.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})


export class UsersComponent implements OnInit {

  displayDialog: boolean;
 

  Selpos: any;
  Selper: any;

  user: User = {};

  selectedUser: User;

  newUser: boolean;

  users: User[];

  cols: any[];

  lstPosicion: any[] = [];
  lstPerfil: any[] = [];

  userForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private httpGralService: HttpGralService,
    private alertService: AlertService,
    ) { }

    ngOnInit() {


      this.userForm = new FormGroup({
        'id': new FormControl(''),
        'alias': new FormControl('', [Validators.required,
          Validators.compose([Validators.minLength(3)]),
          Validators.compose([Validators.maxLength(10)])
        ]),
        'email': new FormControl('',  [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.compose([Validators.minLength(6)])]),
        'nombre': new FormControl('', [Validators.required, 
          Validators.compose([Validators.minLength(10)]),
          Validators.compose([Validators.maxLength(50)])]),
        'idposicion': new FormControl('', [Validators.required]),
        'idperfil': new FormControl('', [Validators.required]),
     });


      this.getUsers();
  
      this.getPosicion();
      this.getPerfil();
  
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

  getPosicion() {
    this.httpGralService.getDatas(apisUrl.posicion).subscribe(
      data => {
        data.forEach(item => {
          this.lstPosicion.push({label:item.descripcion, value:item.id});
        })
        
      });
  }

  getPerfil() {
    this.httpGralService.getDatas(apisUrl.perfil).subscribe(
      data => {

        data.forEach(item => {
          this.lstPerfil.push({label:item.descripcion, value:item.id});
        })

        
      });
  }






  showDialogToAdd() {

    this.newUser = true;
    this.user = {};
    this.displayDialog = true;

    this.Selpos = this.lstPosicion.find(a => a.id === 1);
    this.Selper = this.lstPerfil.find(a => a.id === 1);

    this.user.idperfil = 1;
    this.user.idposicion = 1;

  }

  onsubmit() {

    this.alertService.clear();

    if (this.userForm.valid) {

      if (this.newUser) {
        this.httpGralService.addData(apisUrl.user, this.userForm.value)
          .subscribe(user => {
            this.users.push(user);
            this.user = null;
            this.displayDialog = false;
          });
      } else {
        this.httpGralService.updateData(apisUrl.user, this.userForm.value)
          .subscribe(() => {
            let findUserInList = this.users.find(item => item.id === this.userForm.value.id);
            let index = this.users.indexOf(findUserInList);
            this.users[index] = this.userForm.value;
            this.user = null;
            this.displayDialog = false;
  
          });
  
      }
    }
    else{
      this.alertService.error('Errores en el formulario');
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
          const index = this.users.indexOf(this.selectedUser);
          this.users = this.users.filter((val, i) => i !== index);
          this.user = null;

          this.getUsers();
        });
      },
      reject: () => {
      }
  });
  }



  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneCar(event.data);
    this.Selpos = this.lstPosicion.find(a => a.id === event.data.idposicion);
    this.Selper = this.lstPerfil.find(a => a.id === event.data.idposicion);
    this.displayDialog = true;

    this.userForm.reset(event.data);


  }

  cloneCar(u: User): User {
    const user = {};
    // tslint:disable-next-line:forin
    for (let prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }




  public hasError = (controlName: string, lsterrorName: string[]) => {
    let retbool: boolean = false;
    lsterrorName.forEach(item => {
      retbool = retbool || (this.userForm.controls[controlName].dirty && this.userForm.controls[controlName].hasError(item));      
    });

    return retbool;
  }
}

