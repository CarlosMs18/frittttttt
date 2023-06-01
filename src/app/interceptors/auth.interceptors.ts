import Swal from 'sweetalert2';
import { Injectable } from "@angular/core";

import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http'

import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private authService : AuthService,
    private router :Router
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        catchError(e => {

          if(e.status == 401){


            if(this.authService.isAuthenticated()){ //en el caso de que el token expire, si estamos autentciado cerrearemos la sesion
              this.authService.logout()
            }

            this.router.navigateByUrl("/auth/login")


          }


          if(e.status == 403){
            console.log('eeeeee')
            Swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
            this.router.navigateByUrl("/clientes/");

          }
          return throwError(() => e);

        })

    ); //aca es reponse porque son respestas en el token es req porque so requsts
  }

}
