import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, delay } from 'rxjs';

import { MovieDetails } from '../../core/models/movie-details';
import { environment } from '../../../environments/environment';
import { SearchResult } from '../../core/models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  //Skeleton
  private skeleton:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public skeleton$:Observable<boolean> = this.skeleton.asObservable();

  constructor(private httpClient: HttpClient) { }

  movieDetailsById(id:number):Observable<MovieDetails> {
    this.skeleton.next(true);
    return this.httpClient.get<MovieDetails>(`${environment.BASE_API_URL}movie/${id}`).pipe(
      delay(500),
      finalize(()=> this.skeleton.next(false))
    );
  }

  movieListSimilar(id:number):Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}movie/${id}/similar`);
  }
}
