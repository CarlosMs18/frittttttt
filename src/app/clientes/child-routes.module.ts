import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';


const routes: Routes = [
  { path: '', component: ListarClientesComponent},
  {path : 'page/:page',component: ListarClientesComponent},
  { path : 'form-cliente', component : FormClientesComponent,canActivate : [AuthGuard,RoleGuard],data :{role:'ROLE_ADMIN'}},
  { path : 'form-cliente/:id',component :FormClientesComponent,canActivate : [AuthGuard,RoleGuard],data :{role:'ROLE_ADMIN'}}
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
export class ClientesRoutingModule {}
