import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SearchResult } from '../../core/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  //skeleton
  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public skeleton$: Observable<boolean> = this.skeleton.asObservable();

  constructor(private http: HttpClient) {}

  getNowPlayingMovies(): Observable<SearchResult> {
    return this.http
      .get<SearchResult>(`${environment.BASE_API_URL}movie/now_playing`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }
}
