import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  distinctUntilChanged,
  forkJoin,
  startWith,
  takeUntil,
} from 'rxjs';
import { MovieDTO } from '../../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { MovieDetailsService } from '../../../services/movie-details.service';
import { MovieFavoriteService } from '../../../services/movie-favorite.service';
import { MovieDetailsDTO } from './../../../../core/models/movie-details.dto';

@Component({
  selector: 'app-favorite-library',
  templateUrl: './favorite-library.component.html',
  styleUrl: './favorite-library.component.scss',
})
export class FavoriteLibraryComponent implements OnInit {
  movieIds: number[];
  favoriteMovies: MovieDTO[];

  //Skeleton
  skeleton: boolean;

  //Animation toggle
  isEditing: boolean;

  constructor(
    private movieFavoriteService: MovieFavoriteService,
    private destroy$: AutoDestroyService,
    private movieDetailsService: MovieDetailsService
  ) {
    this.favoriteMovies = [];
    this.movieIds = [];
    this.skeleton = false;
    this.isEditing = false;
  }

  ngOnInit(): void {
    //Initially get all user fav movies
    this.getFavoriteMovies();

    //Get new fav movies when some are deleted
    this.movieFavoriteService.movieRemovedOrAdded$.subscribe((removed) => {
      if (removed) {
        this.getFavoriteMovies();
      }
    });

    //spinner
    this.movieFavoriteService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.skeleton),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.skeleton = value;
      });
  }

  getFavoriteMovies(): void {
    this.movieFavoriteService
      .getFavoriteMovies()
      .pipe(
        takeUntil(this.destroy$),
        concatMap((data: any) => {
          if (data.favorites.length !== 0) {
            this.movieIds = data.favorites.map(
              (favorite: any) => favorite.movie_id
            );
            const movieObservables = this.movieIds.map((id) =>
              this.movieDetailsService.movieDetailsById(id)
            );
            return forkJoin(movieObservables);
          } else {
            return (this.favoriteMovies = []);
          }
        })
      )
      .subscribe((data) => {
        this.favoriteMovies = data.map((details) =>
          this.mapToMovieDTO(details)
        );
        this.skeleton = false;
      });
  }

  // Have to map data for passing it to results list in template
  private mapToMovieDTO(details: MovieDetailsDTO): MovieDTO {
    return {
      adult: details.adult,
      backdrop_path: details.backdrop_path,
      genre_ids: details.genres.map((genre) => genre.id),
      id: details.id,
      original_language: details.original_language,
      original_title: details.original_title,
      overview: details.overview,
      popularity: details.popularity,
      poster_path: details.poster_path,
      release_date: details.release_date,
      title: details.title,
      video: details.video,
      vote_average: details.vote_average,
      vote_count: details.vote_count,
    };
  }

  editingToggle(): void {
    this.isEditing = !this.isEditing;
  }
}
