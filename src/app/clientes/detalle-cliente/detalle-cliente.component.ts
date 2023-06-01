import Swal from 'sweetalert2';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { UploadsService } from 'src/app/services/uploads.service';
import { AuthService } from '../../services/auth.service';
import { ClienteM } from '../../model/cliente.model';
import { Factura } from 'src/app/model/factura.model';
import { FacturasService } from '../../services/facturas.service';


@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit{

    @Input()
    cliente!: ClienteM;

    public fotoSeleccionada!:File | null;

    constructor(
      private uploadService :UploadsService,
      private facturaService :FacturasService,
      public authService : AuthService
    ){}

    ngOnInit(): void {

    }

    seleccionarFoto(event : any){
      this.fotoSeleccionada = event.target.files[0];
      if(this.fotoSeleccionada!.type.indexOf('image') < 0){
          Swal.fire('Error al seleccionar imagen', 'El archivo debe de ser de tipo imagen','error');
          this.fotoSeleccionada = null;
      }
    }

    subitFoto(){
      console.log(this.cliente)
      if(!this.seleccionarFoto){
        Swal.fire("Error","Debe de Seleccionar una foto ", "error");

      }else{
        this.uploadService.subirFoto(this.fotoSeleccionada!, String(this.cliente.id)).subscribe(
          {
            next : response => {
              this.uploadService.notificarUpload.emit(response.cliente);
              Swal.fire("La foto se subio correctamente",response.mensaje, 'success');
            }
          }
        )
      }
    }

    eliminar(factura :Factura){
      Swal.fire({
        title: 'Are you sure?',
        text: `Esta seguro que desea eliminar la factura ${factura.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.facturaService.delete(factura.id)
          .subscribe(
            {
              next : resp => {
                this.cliente.facturas = this.cliente.facturas.filter( f => f !== factura)
                Swal.fire(
                  'Factura Eliminada',
                  `La factura ${factura.descripcion} ha sido eliminado con exito!.`,
                  'success'
                )
              },
              error : (err : any) => {
              /*   if(err.status == 403){
                  console.log('aca 403')
                  Swal.fire('Acceso Denegado', `Hola  no tienes acceso a este recurso`,'warning');
                  this.router.navigateByUrl("/clientes/");

                } */
                Swal.fire(
                  'Error',
                  err.error.mensaje,
                  'error'
                )
              }
            }
          )
        }
      })
    }
}
