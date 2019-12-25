import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../http/authentication.service';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private authenticationService: AuthenticationService) {}

    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }


}
