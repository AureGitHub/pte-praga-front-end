import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { User } from 'src/app/models/user';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/http/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  MenuItems: MenuItem[];

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.IniciaMenu();
    } );
   }

  ngOnInit() {
    this.IniciaMenu();
  }


  logout() {

    this.confirmationService.confirm({
      message: '¿Va a desconectarse de la aplicación?',
      header: 'Confirmación de desconexión',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.authenticationService.logout();
        this.router.navigate(['/']);
      },
      reject: () => {
      }
  });

  }


  IniciaMenu() {

    const EstaConectado = this.currentUser != null;
    const isAdmin = (this.currentUser && this.currentUser.isAdmin) != null;
    const alias = this.currentUser ? this.currentUser.alias : '';

    this.MenuItems = [
      {

        style: {color: 'red'},

          label: 'Partidos',
          icon: 'pi pi-home', routerLink: ['/'],
      },
      {
        label: alias,
        icon: 'pi pi-user', routerLink: ['/detalle-jugador'],
        visible: EstaConectado
    },

      {
          label: 'Jugadores',
          icon: 'pi pi-users', routerLink: ['/jugadores'],
          visible: isAdmin
      },

        {
          label: 'Ranking',
          icon: 'fa fa-smile-o', routerLink: ['/jugadores-ranking'],
          visible: EstaConectado
      },

      {
        label: 'Login',
        icon: 'pi pi-power-off', routerLink: ['/login'],
        visible: !EstaConectado
      },
      {
        label: 'Desconectar',
        icon: 'pi pi-power-off', command: () => {
          this.logout();
         },
        visible: EstaConectado
      },
      {
        label: 'Registro',
        icon: 'fa fa-user-plus', routerLink: ['/registro'],
        visible: !EstaConectado
      },
      // {
      //     label: 'Counters', icon: 'fa fa-fw fa-sitemap',
      //     items: [
      //         {
      //             label: 'Counter',
      //             icon: 'fa fa-fw fa-list-ol', routerLink: ['/counter']
      //         },
      //         {
      //             label: 'PrimeNG Counter',
      //             icon: 'fa fa-fw fa-list-ol', routerLink: ['/prime']
      //         },
      //     ]
      // }
  ];
  }

}
