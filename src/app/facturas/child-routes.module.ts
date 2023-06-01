import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { FormFacturasComponent } from './form-facturas/form-facturas.component';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  { path: ':id', component:DetalleFacturaComponent ,canActivate : [AuthGuard,RoleGuard],data :{role:'ROLE_USER'}},
  {path : 'form-facturas/:clienteId',component : FormFacturasComponent ,canActivate : [AuthGuard,RoleGuard],data :{role:'ROLE_ADMIN'}}

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule {}
