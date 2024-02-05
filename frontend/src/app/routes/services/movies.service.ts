import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, BehaviorSubject, delay, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SearchResult } from '../../core/models/movie';
import { Movie } from '../../core/models/movie';
import { MovieGenres } from '../../core/models/movie-genres';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  //Using Signals
  /* $movies: WritableSignal<Movie[]> = signal([]);

  constructor(private httpClient: HttpClient) { }

  searchMovies(): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/now_playing`);
  }

  setMovies(movies:Movie[]){
    this.$movies.set(movies);
  } */

  //skeleton
  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public skeleton$: Observable<boolean> = this.skeleton.asObservable();


  constructor(private httpClient: HttpClient) { }

  private handleSkeleton(observable:Observable<any>):Observable<any>{
    this.skeleton.next(true);
    return observable.pipe(
      finalize(()=> this.skeleton.next(false))
    );
  }

  getNowPlayingMovies(): Observable<SearchResult> {
    return this.handleSkeleton(this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/now_playing`));

  }

  getPopularMovies(): Observable<SearchResult> {
    return this.handleSkeleton(this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/popular`));
  }

  getTopRatedMovies(): Observable<SearchResult> {
    return this.handleSkeleton(this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/top_rated`));
  }

  getUpcomingMovies(): Observable<SearchResult> {
    return this.handleSkeleton(this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/upcoming`));
  }

  //Get genres

  getMovieGenres(): Observable<MovieGenres> {
    return this.httpClient.get<MovieGenres>(`${environment.BASE_API_URL}genre/movie/list`);
  }


}
