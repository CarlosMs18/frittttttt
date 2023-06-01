import Swal from 'sweetalert2';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes.service';
import { UploadsService } from '../../services/uploads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginacion } from 'src/app/interfaces/paginacion.interface';
import { AuthService } from '../../services/auth.service';
import { ClienteM } from '../../model/cliente.model';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
   public titleNavBar : string = "Dashboard"
   public clientes : ClienteM[] = [];
   public cargando : boolean = true;
   public clienteSeleccionado!: ClienteM;
   public paginador!: Paginacion;




   /* practice */
   public clientes2  : ClienteM[] = [];


   constructor(
    private clienteService :ClientesService,
    private uploadService : UploadsService,
    private activedRoute : ActivatedRoute,
    public authService : AuthService,
    private router :Router
   ){}

   ngOnInit(): void {

    this.activedRoute.paramMap.subscribe(
      {
        next : params => {
          let page = Number(params.get('page'))

          if(!page){
            page = 0
          }

          this.clienteService.listarCliente(page).subscribe(
            {
              next : paginador => {

               /*  console.log(paginador)


                this.clientes2 = paginador.content as any;
                console.log('lerrrro', this.clientes2) */


                this.clientes = paginador.content as ClienteM[];

                console.log('lerrro 2' , this.clientes)
                this.paginador = paginador;


                this.cargando = false

              }
            }
          )
        }
      }
    )



      /* this.clienteService.listarCliente()
      .subscribe(clientes => {
            this.clientes = clientes;
            this.cargando = false;

    }) */

  this.uploadService.notificarUpload.subscribe(cliente => {

    this.clientes = this.clientes.map(clienteOriginal => {
      if(cliente.id == clienteOriginal.id ){
          clienteOriginal.foto = cliente.foto;
      }
      return clienteOriginal;
    })
  })

   }


   eliminarCliente(idCliente : number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(String(idCliente))
        .subscribe(
          {
            next : resp => {
              this.clientes = this.clientes.filter( cliente => cliente.id != idCliente)
              Swal.fire(
                'Eliminado',
                'El cliente ha sido eliminado con exito!.',
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

   abrirModal(cliente : ClienteM){

      this.clienteSeleccionado = cliente;
      console.log('abrir!')
      console.log(this.clienteSeleccionado);
   }
}
