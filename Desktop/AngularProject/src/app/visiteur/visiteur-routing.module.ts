import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisiteurComponent } from './visiteur.component';
import { AproposComponent } from './apropos/apropos.component';
import { HomeVisiteurComponent } from './home-visiteur/home-visiteur.component';

const routes: Routes = [{ path: '', component: VisiteurComponent,
  children: [
    {path: 'apropos', component: AproposComponent },
    {path: 'home-visiteur', component: HomeVisiteurComponent },
    ] ,
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisiteurRoutingModule { }
