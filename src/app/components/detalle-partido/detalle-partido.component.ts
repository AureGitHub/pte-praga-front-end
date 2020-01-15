import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user';
import { Partido } from 'src/app/models/partido';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';
import { AuthenticationService } from 'src/app/services/http/authentication.service';


@Component({
  selector: 'detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  currentUser: User;
  partido: Partido = null;

  diestros: User[]=[];
  reves: User[]=[];
  idpartido: any;

  displayDialog= false;

  newJugadores = [];
  selectJugadores = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {

    this.idpartido =this.route.snapshot.paramMap.get('id');
    this.getPartido();
    this.getJugadores();
  }


  hacerdistribucion(){}

  getJugadores(){
    this.httpGralService.getDataById(apisUrl.partidoxjugadorByIdPartido, this.idpartido).subscribe(
      data => {
        this.diestros = data.filter(a=> a.idposicion === 1);
        this.reves = data.filter(a=> a.idposicion === 2);
      });
  }

  getPartido(){

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;    
      });

  }

  showDialogToAddJugador(){
    this.displayDialog = true;
    this.httpGralService.getDataById(apisUrl.partidoxjugadorAddByIdPartido, this.idpartido).subscribe(
      jugadores => {
        this.newJugadores = jugadores;    
      });

  }

  AddNewJugadores(){

    const formualio = {idpartido : this.idpartido, JugadoresAdd : this.selectJugadores}

    this.httpGralService.addData(apisUrl.partidoxjugadorAddArray, formualio).subscribe(
      jugadores => {
        this.getJugadores();
    this.displayDialog = false;   
      });

    
  }

}
