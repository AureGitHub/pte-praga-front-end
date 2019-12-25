import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() MenuData: MenuItem[];
  @Input() currentUser: User;

  @Output() callLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
