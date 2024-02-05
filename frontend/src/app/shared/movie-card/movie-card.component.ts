import { Component, Input } from '@angular/core';

import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required:true}) movie:Movie;

  constructor(){}

}


