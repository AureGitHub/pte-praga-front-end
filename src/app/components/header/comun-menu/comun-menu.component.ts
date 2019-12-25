import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-comun-menu',
  templateUrl: './comun-menu.component.html',
  styleUrls: ['./comun-menu.component.css']
})
export class ComunMenuComponent implements OnInit {

  @Input() currentUser: User;

  @Output() callLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
