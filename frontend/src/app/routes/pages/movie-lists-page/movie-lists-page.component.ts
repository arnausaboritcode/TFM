import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, takeUntil } from 'rxjs';
import { GenreDTO } from '../../../core/models/genres.dto';
import { MovieDTO } from '../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-lists-page',
  templateUrl: './movie-lists-page.component.html',
  styleUrl: './movie-lists-page.component.scss',
})
export class MovieListsPageComponent implements OnInit {
  //Movie lists
  nowPlayingMovies: MovieDTO[];
  getPopularMovies: MovieDTO[];
  getTopRatedMovies: MovieDTO[];
  getUpcomingMovies: MovieDTO[];

  //Array of Observables (will be fulled with all movie lists requests)
  sources: Observable<any>[];

  //Genres list
  getGenres: GenreDTO[];

  //skeleton
  skeleton: boolean = true;

  constructor(
    private moviesService: MoviesService,
    private destroy$: AutoDestroyService
  ) {
    this.nowPlayingMovies = [];
    this.getPopularMovies = [];
    this.getTopRatedMovies = [];
    this.getUpcomingMovies = [];
    this.getGenres = [];

    this.sources = [
      this.moviesService.getNowPlayingMovies(),
      this.moviesService.getPopularMovies(),
      this.moviesService.getTopRatedMovies(),
      this.moviesService.getUpcomingMovies(),
      this.moviesService.getMovieGenres(),
    ];
  }

  ngOnInit(): void {
    forkJoin(this.sources) //Equivalent to Promise all
      .pipe(takeUntil(this.destroy$))
      .subscribe(([nowPlaying, popular, topRated, upcoming, genres]: any) => {
        this.nowPlayingMovies = nowPlaying.results;
        this.getPopularMovies = popular.results;
        this.getTopRatedMovies = topRated.results;
        this.getUpcomingMovies = upcoming.results;
        this.getGenres = genres.genres;
      });

    this.moviesService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.skeleton = value;
      });
  }
}
