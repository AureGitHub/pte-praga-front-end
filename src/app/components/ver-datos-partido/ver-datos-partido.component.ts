import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-datos-partido',
  templateUrl: './ver-datos-partido.component.html',
  styleUrls: ['./ver-datos-partido.component.css']
})
export class VerDatosPartidoComponent implements OnInit {

  @Input() currentPartido: any;
  @Input() currentUser: any;

  constructor() { }

  ngOnInit() {
  }

}
