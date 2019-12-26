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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpGralService: HttpGralService,
    private authenticationService: AuthenticationService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {

    this.getPartido(this.route.snapshot.paramMap.get('id'));
  }


  hacerdistribucion(){}

  getPartido(idpartido){

    this.httpGralService.getDataById(apisUrl.partido, idpartido).subscribe(
      data => {
        this.partido = data;

        //jugadores del partido

        this.httpGralService.getDatas(apisUrl.partidoxjugador + '?idpartido=' +idpartido ).subscribe(
          jugadorespartido =>
          {
            

            jugadorespartido.forEach(jugador => 
              this.httpGralService.getDataById(apisUrl.user,jugador.idjugador).subscribe(
                user => {
                  if(user!=null){
                    if(user.idposicion === 1){
                      this.diestros.push(user)
                    }else if(user.idposicion === 2){
                      this.reves.push(user)
                    }
                    
                  }

                }
              )            
             );




          });

        
        




      });

  }

}
