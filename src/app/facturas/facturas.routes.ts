import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
    {
      path : 'factura',
      loadChildren : () => import('./child-routes.module').then(m => m.FacturaRoutingModule)
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
export class FacturaRoutingModule {}
