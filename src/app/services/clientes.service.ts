import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';
import { Paginacion } from '../interfaces/paginacion.interface';
import { Region } from '../interfaces/region.interface';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { ClienteM } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor(
    private http : HttpClient,
    private router : Router,
    private authService : AuthService
  ) { }
 /*  private httpHeaders = new HttpHeaders({'Content-Type':'Application/json'}) */
  private base_url = environment.base_url;


/*   private agregarAuthorizationHeader(){
      let token = this.authService.token;
      if(token != null){
        return this.httpHeaders.append('Authorization','Bearer ' + token);
      }
      return this.httpHeaders;
  } */

/*   public isNoAutorizado(e : any): boolean{

    if(e.status == 401){


      if(this.authService.isAuthenticated()){ //en el caso de que el token expire, si estamos autentciado cerrearemos la sesion
        this.authService.logout()
      }

      this.router.navigateByUrl("/auth/login")
      return true;

    }


    if(e.status == 403){

      Swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
      this.router.navigateByUrl("/clientes/");
      return true;
    }

    return false;
  } */


  public listarCliente(page : number) /* : Observable<Cliente[]> */{
    return this.http.get<Paginacion>(`${this.base_url}/clientes/page/${page}`);
  }

  public crearCliente(cliente : Cliente){
    return this.http.post<{cliente_nuevo :Cliente,mensaje : string, error :any}>(`${this.base_url}/clientes`, cliente/* ,{headers : this.agregarAuthorizationHeader()} */)
   /*  .pipe(
      catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(() => {
              new Error(e)
            })

          }
          return throwError(() => {
            new Error(e)
          })
      })
    ); */
  }

  public obtenerClienteUnico(idCliente : string){
    return this.http.get<ClienteM>(`${this.base_url}/clientes/${idCliente}`/* ,{headers : this.agregarAuthorizationHeader()} */)
    /* .pipe(
      catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(() => {
              new Error(e)
            })

          }
          return throwError(() => {
            new Error(e)
          })
      })
    ); */
  }


  public actualizarCliente(cliente : Cliente){

    return this.http.put<{cliente_actualizado:Cliente, mensaje : string}>(`${this.base_url}/clientes/${cliente.id}`, cliente/* ,{headers : this.agregarAuthorizationHeader()} */)
   /*  .pipe(
      catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(() => {
              new Error(e)
            })

          }
          return throwError(() => {
            new Error(e)
          })
      })
    ); */
  }

  public eliminarCliente(idCliente : string){
    return this.http.delete<any>(`${this.base_url}/clientes/${idCliente}`/* ,{headers : this.agregarAuthorizationHeader()} */)
   /*  .pipe(
      catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(() => {
              new Error(e)
            })

          }
          return throwError(() => {
            new Error(e)
          })
      })
    ); */
  }


  public verRegiones(){
    return this.http.get<Region[]>(`${this.base_url}/clientes/regiones`/* ,{headers : this.agregarAuthorizationHeader()} */)
    /* .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => {
          new Error(e)
        })
      })
    ); */
  }
}
