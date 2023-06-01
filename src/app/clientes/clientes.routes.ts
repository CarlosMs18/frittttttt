import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  {
    path:"clientes",
    component : ClientesComponent,
   /*  canActivate : [AuthGuard], */
    loadChildren : () => import('./child-routes.module').then(m => m.ClientesRoutingModule)
  }

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
