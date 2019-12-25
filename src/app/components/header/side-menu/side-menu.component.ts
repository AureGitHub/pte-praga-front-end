import { User } from 'src/app/models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() MenuData: MenuItem[];
  @Input() currentUser: User;

  @Output() callLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
