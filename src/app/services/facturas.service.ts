import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../model/factura.model';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private urlEndPointFactura : string = 'http://localhost:8080/api/facturas';

  constructor(private http : HttpClient) {
    this.cerrarModal()
  }

  getFacturaUnico(id : number) : Observable<Factura>{
    console.log(`${this.urlEndPointFactura}/${id}`)
    return this.http.get<Factura>(`${this.urlEndPointFactura}/${id}`);
  }

  create(factura : Factura) : Observable<Factura>{
    console.log('aca');

    console.log(this.urlEndPointFactura)
    return this.http.post<Factura>(this.urlEndPointFactura,factura);
  }

  delete(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointFactura}/${id}`);
  }

  filtrarProductos(term : string): Observable<Producto[]>{
      return this.http.get<Producto[]>(`${this.urlEndPointFactura}/filtrar-productos/${term}`)
  }




  public cerrarModal(){
    const modalSelector = document.querySelector(".modal-backdrop");
    if(modalSelector){
      modalSelector.classList.remove("show");
      modalSelector.classList.remove("modal-backdrop");
      return;
    }
  }
}
