import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
   return this.authService.user.pipe(
     take(1),
     map( user => {
     return !!user;
     const isAuth = !!user;
     if (isAuth) {
       return true;
     }
   }));
  }
}
