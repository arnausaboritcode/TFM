import { Component, OnInit } from '@angular/core';
import { forkJoin, takeUntil } from 'rxjs';
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
  favoriteMovies: MovieDTO[];

  //Skeleton
  skeleton: boolean;

  //User is changing his favorite movies catalog
  isEditing: boolean;

  constructor(
    private movieFavoriteService: MovieFavoriteService,
    private destroy$: AutoDestroyService,
    private movieDetailsService: MovieDetailsService
  ) {
    this.favoriteMovies = [];
    this.skeleton = false;
    this.isEditing = false;
  }

  ngOnInit(): void {
    //Initially, gets all user favorite movies
    this.getFavoriteMovies();

    //Gets updated favorite movies when are changed
    this.subscribeToChanges();

    //skeleton
    this.movieFavoriteService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.skeleton = value;
      });
  }

  getFavoriteMovies(): void {
    this.movieFavoriteService.getFavoriteMovies().subscribe((data: any) => {
      if (data.favorites.length !== 0) {
        const movieIds = data.favorites.map(
          (favorite: any) => favorite.movie_id
        );
        this.getMoviesDetails(movieIds);
      } else {
        this.favoriteMovies = [];
        this.skeleton = false;
      }
    });
  }

  getMoviesDetails(movieIds: number[]): void {
    const movieObservables = movieIds.map((id) =>
      this.movieDetailsService.movieDetailsById(id)
    );
    forkJoin(movieObservables)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: MovieDetailsDTO[]) => {
        this.favoriteMovies = data.map((details) =>
          this.mapToMovieDTO(details)
        );
        this.skeleton = false;
      });
  }

  subscribeToChanges(): void {
    this.movieFavoriteService.movieRemovedOrAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((changed) => {
        if (changed) {
          this.getFavoriteMovies();
        }
      });
  }

  // Have to map data to MovieDTO model for passing it to results list in template
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

  //Editing toogle
  editingToggle(): void {
    this.isEditing = !this.isEditing;
  }
}
