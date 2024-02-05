import { Component, Input, OnInit } from '@angular/core';


import { Movie } from '../../core/models/movie';
import { MoviesService } from '../../routes/services/movies.service';

@Component({
  selector: 'app-movie-search-card',
  templateUrl: './movie-search-card.component.html',
  styleUrl: './movie-search-card.component.scss'
})
export class MovieSearchCardComponent implements OnInit {
  @Input({required:true}) movie:Movie;
  public genres: Map<number, string> = new Map<number, string>();
  public genresNames:string[] = [];

  constructor(private moviesService: MoviesService){}

  ngOnInit(): void {
    this.getGenresById();

  }

  getGenresById() {
    this.moviesService.getMovieGenres().subscribe((data)=> {
    data.genres.forEach((genre) => this.genres.set(genre.id, genre.name));
    for (let id of this.genres.keys()) {
      if (this.movie.genre_ids.includes(id)) {
        this.genresNames.push(this.genres.get(id)!);
      }
      }
    }
    )
  }
}
