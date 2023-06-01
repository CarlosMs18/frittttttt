import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService : AuthService,
    private router : Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuthenticated()){

        if(this.isTokenExpirado()){
          this.authService.logout();
          this.router.navigateByUrl("/auth/login")
          return false;
        }
        return true;
      }
      this.router.navigateByUrl("/auth/login")
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  isTokenExpirado() : boolean{  //si el token ha expriado
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;//convierte e milisegundos se divide entre mil para convertir a segundos
    if(payload.exp < now){
      return true;
    }
    return false;
  }
}
