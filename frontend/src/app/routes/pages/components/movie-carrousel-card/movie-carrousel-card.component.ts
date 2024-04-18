import { Component, Input } from '@angular/core';
import { MovieDTO } from '../../../../core/models/movie.dto';

@Component({
  selector: 'app-movie-carrousel-card',
  templateUrl: './movie-carrousel-card.component.html',
  styleUrl: './movie-carrousel-card.component.scss',
})
export class MovieCarrouselCardComponent {
  @Input({ required: true }) movie!: MovieDTO;
  constructor() {}
}
