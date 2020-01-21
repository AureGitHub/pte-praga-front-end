import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partidoxpista',
  templateUrl: './partidoxpista.component.html',
  styleUrls: ['./partidoxpista.component.css']
})
export class PartidoxpistaComponent implements OnInit {

  @Input() partidosxpistas: [];

  constructor() { }

  ngOnInit() {
  }

}
