import { Component } from '@angular/core';
import { Film } from '../../shared/models/film';
import { FILMS } from '../../shared/models/des-films';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-visiteur',
  imports: [CommonModule],
  templateUrl: './home-visiteur.component.html',
  styleUrl: './home-visiteur.component.css'
})
export class HomeVisiteurComponent {
  tabFilms: Film[] = FILMS;
  constructor() { }
  ngOnInit(): void {
}
affiche(f:Film){
  f.descVisible = true;
}
cacher(f:Film){
  f.descVisible = false;
}
}
