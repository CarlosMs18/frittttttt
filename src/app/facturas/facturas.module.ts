import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { RouterModule } from '@angular/router';
import { FormFacturasComponent } from './form-facturas/form-facturas.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DetalleFacturaComponent,
    FormFacturasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [
    DetalleFacturaComponent
  ]
})
export class FacturasModule { }
