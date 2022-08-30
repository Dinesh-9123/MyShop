import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | any | Observable<boolean | UrlTree> | Promise<boolean | UrlTree > 
    {
      let roleId = localStorage.getItem('userRole');
      if(roleId != null){
        if(+roleId == 1){
          return true;
        }
        else{
          return this.router.navigateByUrl('/products');
        }
      }
      else{
        return this.router.navigateByUrl('/products');
      }
      
    }
}
