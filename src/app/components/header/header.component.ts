import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

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
    public router: Router

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
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authenticationService.logout();
        this.router.navigate(['/']);
      },
      reject: () => {
      }
  });

  }


  IniciaMenu() {
    this.MenuItems = [ 
      {

        style: {color:'red'},
        
          label: 'Home',
          icon: 'pi pi-home', routerLink: ['/'],
      },

      {
        label: 'Login', 
        icon: 'pi pi-power-off', routerLink: ['/login'],
        visible: !this.currentUser
    },

      {
          label: 'Logout',
          icon: 'pi  pi-power-off',
          visible: this.currentUser != null,
          command: (event: Event) => { this.logout(); }

      },
      {
          label: 'Jugadores',
          icon: 'pi pi-users', routerLink: ['/users']
      },
      {
          label: 'Counters', icon: 'fa fa-fw fa-sitemap',
          items: [
              {
                  label: 'Counter',
                  icon: 'fa fa-fw fa-list-ol', routerLink: ['/counter']
              },
              {
                  label: 'PrimeNG Counter',
                  icon: 'fa fa-fw fa-list-ol', routerLink: ['/prime']
              },
          ]
      }
  ];
  }

}
