import { Component, Input, OnInit } from '@angular/core';
import { GenreDTO } from '../../../core/models/genres.dto';
import { MovieDTO } from '../../../core/models/movie.dto';
import { MoviesService } from '../../../routes/services/movies.service';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrl: './results-card.component.scss',
})
export class ResultsCardComponent implements OnInit {
  @Input({ required: true }) movie!: MovieDTO;
  genres: Map<number, string> = new Map<number, string>();
  genresNames: string[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getGenresById();
  }

  getGenresById() {
    this.moviesService.getMovieGenres().subscribe((data) => {
      data.genres.forEach((genre: GenreDTO) =>
        this.genres.set(genre.id, genre.name)
      );
      for (let id of this.genres.keys()) {
        if (this.movie.genre_ids.includes(id)) {
          this.genresNames.push(this.genres.get(id)!);
        }
      }
    });
  }
}
