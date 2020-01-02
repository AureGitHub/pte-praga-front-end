
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../http/authentication.service';


@Injectable()
export class EstadoGuard implements CanActivate {


  constructor(
    private authenticationService: AuthenticationService,
    private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;


    if(!currentUser){
      this._router.navigate(['/login']);
    return false;
    }

    console.log(currentUser.idestado);
    if (currentUser && currentUser.idestado===1) {
        this._router.navigate(['/confirm-email']);
        return false;
    }


   
    return true;
  }

}
