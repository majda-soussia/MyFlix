import { NgModule } from '@angular/core';
import { RouterModule, Routes , PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  {path: 'visiteur', loadChildren: () => import('./visiteur/visiteur.module').then(m => m.VisiteurModule) },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports:[RouterModule.forRoot(routes,
    {preloadingStrategy: PreloadAllModules}
  )],
  exports:[RouterModule]
})
export class AppRoutingModule{}
