import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeoutService {

    timer: any;

    constructor() { }

    EsperaFinTiempo(tiempoEspera) {
        return new Observable(observer => {
          const setInactive = () => {
            observer.next(true);
          };
          clearTimeout(this.timer);
          this.timer = setTimeout(setInactive, tiempoEspera);
        });
    }

    ClearTiempoEspera() {
        clearTimeout(this.timer);
    }
}
