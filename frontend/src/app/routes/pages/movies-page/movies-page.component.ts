import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { takeUntil, map, forkJoin, startWith,distinctUntilChanged, Observable } from 'rxjs';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../core/models/movie';
import { MovieDetailsService } from '../../services/movie-details.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './movies-page.component.scss'
})
export class MoviesPageComponent implements OnInit {

  //skeleton
  public skeleton:boolean = true;

  public nowPlayingMovies: Movie[];
  public getPopularMovies: Movie[];
  public getTopRatedMovies: Movie[];
  public getUpcomingMovies: Movie[];

  public sources = [
    this.moviesService.getNowPlayingMovies(),
    this.moviesService.getPopularMovies(),
    this.moviesService.getTopRatedMovies(),
    this.moviesService.getUpcomingMovies(),
  ];

  constructor(private moviesService: MoviesService, private destroy$:AutoDestroyService, private movieDetailsService: MovieDetailsService){}

  ngOnInit(): void {
    forkJoin(this.sources)//Promise all
      .pipe((takeUntil(this.destroy$)))
        .subscribe(([nowPlaying, popular, topRated, upcoming]: any) => {
          this.nowPlayingMovies = nowPlaying.results;
          this.getPopularMovies = popular.results;
          this.getTopRatedMovies = topRated.results;
          this.getUpcomingMovies = upcoming.results;
        })

    this.moviesService.skeleton$.pipe(
      (takeUntil(this.destroy$)),
      startWith(this.skeleton),
      distinctUntilChanged(),
      )
      .subscribe(value => {
        this.skeleton = value;
      })
  }
}
