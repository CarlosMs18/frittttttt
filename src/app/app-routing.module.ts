import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesRoutingModule } from './clientes/clientes.routes';
import { AuthRoutingModule } from './auth/login/login.routes';

import { FacturaRoutingModule } from './facturas/facturas.routes';


const routes: Routes = [
  {
    path : "", redirectTo:'clientes',pathMatch:'full'
  },
  {
    path : "**",redirectTo:'clientes'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ClientesRoutingModule,
    AuthRoutingModule,
    FacturaRoutingModule
    ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
