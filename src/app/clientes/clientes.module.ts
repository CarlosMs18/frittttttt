import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { RouterModule } from '@angular/router';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClientePaginadorComponent } from './cliente-paginador/cliente-paginador.component';



@NgModule({
  declarations: [
    ClientesComponent,
    ListarClientesComponent,
    FormClientesComponent,
    DetalleClienteComponent,
    ClientePaginadorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ],
  exports :[
    ListarClientesComponent
  ]
})
export class ClientesModule { }
