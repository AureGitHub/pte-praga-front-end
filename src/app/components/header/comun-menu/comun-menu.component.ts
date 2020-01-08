import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/http/authentication.service';

@Component({
  selector: 'app-comun-menu',
  templateUrl: './comun-menu.component.html',
  styleUrls: ['./comun-menu.component.css']
})
export class ComunMenuComponent implements OnInit {

  currentUser: User;

  @Output() callLogout = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

}
