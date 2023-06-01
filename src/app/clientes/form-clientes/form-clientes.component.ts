import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup , Validators} from '@angular/forms'
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Region } from '../../interfaces/region.interface';
@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit{

  public errores : string[] = [];
  public nombreBtn : string = "Crear Cliente"
  public nombreTitulo : string = "Formulario Cliente"
  public cargando : boolean = true;
  public idCliente : string = '';
  public cliente!: Cliente;
  public clienteSeleccionado!: Cliente;
  public regiones : Region[] = [];

  public clienteForm : FormGroup = this.fb.group({
    nombre : ['',Validators.required],
    email : ['',Validators.required],
    fechaCreacion :['',Validators.required],
    region : this.fb.group({
      id : ['',Validators.required],
      nombre : ['',]
    })
    /* region : [,Validators.required] */
  })

  constructor(
    private fb : FormBuilder,
    private router :Router,
    private activatedRoute : ActivatedRoute,
    private clienteService :ClientesService
  ){}



  ngOnInit(): void {


      this.clienteService.verRegiones().subscribe(

        {
          next : regiones => {
            this.regiones = regiones
            console.log("R")
          }
        }
      )

      this.cargando = false;
      this.activatedRoute.params.subscribe(params => {
        console.log("p")
        let id = params['id'];
        if(id){
          this.detalleCliente(id);

        }else{
          console.log('no hay')
        }
      })
  }



  detalleCliente(idCliente : number){
    this.clienteService.obtenerClienteUnico(String(idCliente)).subscribe(

      {
        next :cliente=> {
          console.log('eeeee')
          console.log(cliente)
            this.clienteForm.patchValue({
              nombre : cliente.nombre,
              email : cliente.email,
              fechaCreacion : cliente.fechaCreacion,
              region : {
                id : cliente.region.id,
                nombre : cliente.region.nombre
              }
            })
            this.idCliente = String(cliente.id);
            this.cliente = cliente;
            this.clienteSeleccionado = cliente;
            this.cargando = false;
            this.nombreBtn = "Editar Cliente";
            this.nombreTitulo = `Editar ${cliente.nombre}`;


        },
        error : err => {

          if(err.status == 404){
              Swal.fire('ERROR',err.error.mensaje,'error');
              return;
           }

        }
      }
    )
  }

  enviarDatos(){

    if(!this.clienteForm.invalid){
        console.log(!this.clienteForm.invalid)
        console.log(this.clienteForm.valid)
    this.regiones = this.regiones.filter(region=> region.id ==this.clienteForm.get('region')?.get('id')?.value)!

    this.clienteForm.get('region')?.patchValue({
      id : this.regiones[0].id,
      nombre : this.regiones[0].nombre

    })

    if(this.idCliente){
       console.log(this.clienteForm.value)
        this.actualizarCLiente();
    }else{
      this.crearCliente();
    }
    }


  }

  actualizarCLiente(){

    this.cliente = {
      id : Number(this.cliente.id),
      ...this.clienteForm.value


    }

    //this.clientes.facturas = null /si estamos actualizando solo el cliente no es necesario mndar la factura , opcional o no
    this.clienteService.actualizarCliente(this.cliente).subscribe(
      {
        next : response => {
          console.log('respuesta', response)
          Swal.fire("Actualizado",`El cliente ${response.mensaje}`,"success");
          this.router.navigateByUrl("/clientes");
        },
        error : err => {
          Swal.fire("Error",err.error.mensaje,"error");

        }
      }
    )
  }


  crearCliente(){

 /*  this.region= this.regiones.filter(region=> region.id == this.clienteForm.get('region')?.value);
  const {region , ...valor} = this.clienteForm.value;
  console.log(...this.region)
  const creacion = {
    valor,
    region
  }
    this.clienteForm.setValue = {
      region : "1"
    }
    console.log(creacion) */
    this.clienteService.crearCliente(this.clienteForm.value).subscribe(
      {
        next : cliente => {
          Swal.fire("Correcto" ,"El usuario ha sido creado con exito",'success');
          this.router.navigateByUrl("/clientes");

        },
        error : err => {
          if(err.status == 400){
            this.errores = err.error.errores;
            return;
          }


          if(err.status==401){
            console.log('redireccionando!')
          }
         /*  if(this.clienteService.isNoAutorizado(err)){
              console.log('a')
          } */
          this.errores = [];
          Swal.fire('Error',err.error.mensaje,'error');


        }
      }
    )
  }


}
