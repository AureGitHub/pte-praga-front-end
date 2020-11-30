import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido } from 'src/app/models/partido';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { HttpGralService, apisUrl  } from 'src/app/services/http/http.gral.service';

@Component({
  selector: 'app-manual-partido',
  templateUrl: './manual-partido.component.html',
  styleUrls: ['./manual-partido.component.css']
})
export class ManualPartidoComponent implements OnInit {

  currentUser: any;
  partido: Partido = null;
  idpartido: any;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private httpGralService: HttpGralService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.idpartido = this.route.snapshot.paramMap.get('id');
    this.getPartido();
  }

  getPartido() {

    this.httpGralService.getDataById(apisUrl.partido, this.idpartido).subscribe(
      data => {
        this.partido = data;
      });

  }


}
