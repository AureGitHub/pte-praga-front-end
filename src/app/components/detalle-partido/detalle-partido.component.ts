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

  getPartido(id){

    this.httpGralService.getDataById(apisUrl.partido, id).subscribe(
      data => {
        this.partido = data;
      });

  }

}
