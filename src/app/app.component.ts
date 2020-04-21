import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/http/authentication.service';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent implements OnInit {

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService,
      
    ) {
        this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
          } );
     }

    ngOnInit() {
    }

}
