import { Component, Input } from '@angular/core';
import { Movie } from '../../core/models/movie';


@Component({
  selector: 'app-movie-search-list',
  templateUrl: './movie-search-list.component.html',
  styleUrl: './movie-search-list.component.scss'
})
export class MovieSearchListComponent {
  @Input({ required: true }) results:Movie[];

  constructor(){}


}
