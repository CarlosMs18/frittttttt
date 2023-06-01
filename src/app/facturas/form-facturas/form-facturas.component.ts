

import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/model/factura.model';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services/facturas.service';
import { FormControl } from '@angular/forms';
import { filter, map, mergeMap, Observable, startWith } from 'rxjs';
import { Producto } from '../../model/producto.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from 'src/app/model/item-factura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.css']
})
export class FormFacturasComponent implements OnInit {
    titulo : string = 'Nueva Factura';
    factura : Factura = new Factura();

    autocompleteControl = new FormControl('');
    //productos: string[] = ['Mesa','Tablet','Sony','Samsung','Tv LG','Bicicleta'];
    productosFiltrados: Observable<Producto[]>;
    constructor(
      private clienteService :ClientesService,
      private activatedRoute: ActivatedRoute,
      private facturaService :FacturasService,
      private router : Router
    ){}


    ngOnInit(): void {
      this.facturaService.cerrarModal();
      this.activatedRoute.paramMap.subscribe({
        next : params => {
          let clienteId = params.get("clienteId");
          this.clienteService.obtenerClienteUnico(clienteId).subscribe(
            {
              next : cliente => {
                this.factura.cliente = cliente

              }
            }
           )
        }
      })
      this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(

        map((value : any) =>{

          return typeof value === 'string' ? value : value.nombre
        }),
        mergeMap(value =>  value ?  this._filter(value || '') : []),
      );
    }

    private _filter(value: string): Observable<Producto[]>{
      const filterValue = value.toLowerCase();

      //return this.productos.filter(option => option.toLowerCase().includes(filterValue));
      return this.facturaService.filtrarProductos(filterValue);
    }


    mostrarNombre(producto? : Producto) : string | undefined{
        return producto? producto.nombre : undefined;
    }  //metodo para mostrar lo encontrado en el automcplete  sera opcional porque mientras no se seleccione ningin proucto
                //en las opciones no se debe de mostrar nada



    seleccionarProducto(event : MatAutocompleteSelectedEvent) : void{
      let producto = event.option.value as Producto;
      console.log(producto)


      if(this.existeItem(producto.id)){
        this.incrementaCantidad(producto.id)
      }else{

        let nuevoItem = new ItemFactura();
        nuevoItem.producto = producto;


        console.log(nuevoItem)
        this.factura.items.push(nuevoItem);

        console.log(this.factura)
      }



      this.autocompleteControl.setValue('');
      event.option.focus();
      event.option.deselect();


    }


    actualizarCantidad(id : number, event : any) : void{
      let cantidad  : number = event.target.value as number;

      if(cantidad==0){
        return this.eliminarItemFactura(id);
      }

      this.factura.items = this.factura.items.map((item :ItemFactura)=>{
        if(id === item.producto.id){
          item.cantidad = cantidad;
        }
        return item
      } );

    }

    existeItem(id : number) : boolean{
        let existe = false;
        this.factura.items.forEach((item  : ItemFactura) => {
          if(id === item.producto.id){
             existe = true
          }
        });

        return existe;
    }


    incrementaCantidad(id : number) : void{
      this.factura.items = this.factura.items.map((item :ItemFactura)=>{
        if(id === item.producto.id){
          item.cantidad++ ;
        }
        return item
      } );
    }

    eliminarItemFactura(id : number) : void{
      this.factura.items = this.factura.items.filter((item :ItemFactura) => id !== item.producto.id)
    }


    create() : void{
      console.log(this.factura)
      this.facturaService.create(this.factura).subscribe(factura =>{
          Swal.fire(this.titulo , `Factura ${factura.descripcion} creada con exito`,'success');
          this.router.navigateByUrl('/clientes')
      })
    }
}
