import Swal from 'sweetalert2';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private upload_url = environment.base_url;

  private _notificarUpload = new EventEmitter<any>();
  constructor(
    private http : HttpClient,
    private router : Router,
    private authServide : AuthService
  ) { }

  public isNoAutorizado(e : any): boolean{


    if(e.status == 401 ){
      console.log('aca 401')
      this.router.navigateByUrl("/auth/login")
      return true;

    }

    return false;
  }
  get notificarUpload() : EventEmitter<any>{
    return this._notificarUpload;
  }

  subirFoto(archivo : File, id : string){
    const formData  = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id)

    let httpHeaders = new HttpHeaders();
    let token = this.authServide.token;
    if(token != null){
      httpHeaders =  httpHeaders.append('Authorization','Bearer ' + token)
    }

    return this.http.post<{cliente : Cliente , mensaje : string}>(`${this.upload_url}/clientes/upload`,formData/* , {headers : httpHeaders} */)
   /*  .pipe(
      catchError(e => {

        this.isNoAutorizado(e);
        return throwError(() => {
          new Error(e)
        })
      })
    ); */
  }
}
