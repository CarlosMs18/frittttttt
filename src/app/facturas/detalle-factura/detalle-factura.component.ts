import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/model/factura.model';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura : Factura;
  titulo : string= 'Factura';
  constructor(
    private facturaService : FacturasService,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    /* this.cerrarModal(); */

    this.obtenerFactura();
  }


  private obtenerFactura(){
    this.activatedRoute.paramMap.subscribe(
      {
        next : params => {
          let id = +params.get('id');
          this.facturaService.getFacturaUnico(id).subscribe(
            {
              next : factura => {
                console.log(factura)
                this.factura = factura;
              }
            }
          )
        }
      }
    )
  }

  /* private cerrarModal(){
    const modalSelector = document.querySelector(".modal-backdrop");
    if(modalSelector){
      modalSelector.classList.remove("show");
      return;
    }
  } */
}
