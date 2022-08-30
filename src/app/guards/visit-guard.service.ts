import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisitGuardService implements CanActivate {

  constructor(private route:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
      let token = localStorage.getItem('token');
      let expiresIn = localStorage.getItem('expiresIn');

      if(token != null && expiresIn != null){
        return this.route.navigateByUrl('/products');
      }
      else{
        return true;
      }

    }
}
