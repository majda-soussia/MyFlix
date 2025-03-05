import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { AjouterFilmComponent } from './ajouter-film/ajouter-film.component';

const routes: Routes = [{ path: '', component: AdminComponent,
  children: [
      {path: 'liste-films', component: ListeFilmsComponent },
      {path: 'add-film', component: AjouterFilmComponent },
      ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
