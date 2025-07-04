import { Component } from '@angular/core';
import { Film } from '../../shared/models/film';
import { FilmsService } from '../../services/films.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-films',
  imports: [CommonModule],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css'
})
export class ListeFilmsComponent {
  tabFilms: Film[] = [];
  constructor(private filmsService : FilmsService) { }

  ngOnInit(): void {
  this.tabFilms=this.filmsService.getFilms();

  }
}
