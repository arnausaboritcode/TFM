import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FiltersDTO } from '../../core/models/filters.dto';
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
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL_FRONTEND}movie/now_playing`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getPopularMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(`${environment.BASE_API_URL_FRONTEND}movie/popular`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getTopRatedMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL_FRONTEND}movie/top_rated`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  getUpcomingMovies(): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    return this.http
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL_FRONTEND}movie/upcoming`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  //Get genres

  getMovieGenres(): Observable<GenresDTO> {
    return this.http.get<GenresDTO>(
      `${environment.BASE_API_URL_FRONTEND}genre/movie/list`
    );
  }

  //Discover movies - movies by genre and filters

  getDiscoverMovies(filters?: FiltersDTO): Observable<SearchResultDTO> {
    this.skeleton.next(true);
    const params = new HttpParams({
      fromObject: { ...filters },
    });
    return this.http
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL_FRONTEND}discover/movie?${params}`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }
}
