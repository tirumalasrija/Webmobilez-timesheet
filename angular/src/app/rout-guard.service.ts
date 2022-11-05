import { Injectable } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRouteSnapshot,CanActivate,CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';
import { CommonAuthService } from './auth/common-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private auth: CommonAuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const expectedRole = route.data.expectedRole;
    const  role = localStorage.getItem('role');
  	return this.auth.isAuthonticated().then(
  		(authSuccess: boolean) => {

  			if(authSuccess){
          if ( role != expectedRole ) {

            
            this.router.navigate(['/dashboard']);

          }
  				return true;
  			}else{
  				this.router.navigate(['/home']);
  			}
  	});
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean{
  	return this.canActivate(route, state);
  }
}
