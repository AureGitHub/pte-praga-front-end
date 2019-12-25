
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../http/authentication.service';


@Injectable()
export class RoleGuard implements CanActivate {


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


    if (currentUser && next.data.idperfil.some(a =>  a === currentUser.idperfil)) {
      return true;
    }


    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }

}
