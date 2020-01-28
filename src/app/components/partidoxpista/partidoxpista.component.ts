import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/services/components/alert.service';
import { HttpGralService, apisUrl } from 'src/app/services/http/http.gral.service';

@Component({
  selector: 'app-partidoxpista',
  templateUrl: './partidoxpista.component.html',
  styleUrls: ['./partidoxpista.component.css']
})
export class PartidoxpistaComponent implements OnInit {


  @Input() partidosxpistas: [];  
  @Input() pistasArray:Array<number> = [];
  @Input() turnosArray:Array<number> = [];

  displayDialog = false;

  tanteo = [];
  selectTanteoPar1: any;
  selectTanteoPar2: any;

  marcadorPartido: any;


  pxp: any;
  pxp_setMarcador: never;
  numSet: any;

  constructor(
    private alertService: AlertService,
    private httpGralService: HttpGralService,
  ) { 

    this.setTantao();

    
  
  }

  ngOnInit() {
    
  }

  setTantao() {
    for(var i=1;i<=10;i++){
      this.tanteo.push({label:i, value:i});
    }
    
  }

  setMarcador(idpista,idturno, set){

      this.pxp_setMarcador = this.partidosxpistas.find(a=> a['idpista'] === idpista && a['idturno'] === idturno);

      this.numSet =set;



    this.displayDialog= true;
    this.marcadorPartido = `${this.pxp_setMarcador['nombre']}    set ${set}` ;
  }

  saveSet(){
    if(!(this.selectTanteoPar1 && this.selectTanteoPar2)){
      this.alertService.error('Tiene que introducir el marcador para los dos jugadores');
      return;  
    }

    let form ={
      idpartidoxpista :this.pxp_setMarcador['id'] ,
      idset: this.numSet,
      juegospareja1: this.selectTanteoPar1,
      juegospareja2: this.selectTanteoPar2
    };

    this.httpGralService.addData(apisUrl.partidosxpistaxmarcador, form).subscribe(
      set => {
        this.alertService.success('Set guardado correctamente');
        this.displayDialog = false;
      });

   
  }


  getpistaxpartido(idpista,idturno){
    this.pxp = this.partidosxpistas.find(a=> a['idpista'] === idpista && a['idturno'] === idturno);
  }

}
