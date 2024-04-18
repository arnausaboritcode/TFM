import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GenresDTO } from '../../core/models/genres.dto';
import { SearchResultDTO } from '../../core/models/movie.dto';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  //skeleton
  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  skeleton$: Observable<boolean> = this.skeleton.asObservable();

  constructor(private http: HttpClient) {}

  //Get movie lists
  getNowPlayingMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(`${environment.BASE_API_URL}movie/now_playing`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getPopularMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(`${environment.BASE_API_URL}movie/popular`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getTopRatedMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(`${environment.BASE_API_URL}movie/top_rated`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getUpcomingMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(`${environment.BASE_API_URL}movie/upcoming`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  //Get genres

  getMovieGenres(): Observable<GenresDTO> {
    return this.http.get<GenresDTO>(
      `${environment.BASE_API_URL}genre/movie/list`
    );
  }

  //Discover movies - movies by genre and filters

  getDiscoverMovies(genreIds: string[]): Observable<SearchResultDTO> {
    return this.http
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL}discover/movie?with_genres=${genreIds}`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }
}
