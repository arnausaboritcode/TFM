import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SearchResultDTO } from '../../core/models/movie.dto';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  //searchTerms
  private searchTerms: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  searchTerms$: Observable<string> = this.searchTerms.asObservable();

  //skeleton
  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  skeleton$: Observable<boolean> = this.skeleton.asObservable();

  constructor(private http: HttpClient) {}

  //Get movies by query filter
  searchMovies(title: string, nextPage?: number): Observable<SearchResultDTO> {
    if (nextPage) {
      this.skeleton.next(true);
      return this.http
        .get<SearchResultDTO>(
          `${environment.BASE_API_URL_FRONTEND}search/movie?query=${title}&page=${nextPage}`
        )
        .pipe(
          delay(500),
          finalize(() => this.skeleton.next(false))
        );
    }
    if (title && title.trim() !== '') {
      this.skeleton.next(true);
    }

    return this.http
      .get<SearchResultDTO>(
        `${environment.BASE_API_URL_FRONTEND}search/movie?query=${title}`
      )
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  setQueryString(query: string) {
    this.searchTerms.next(query);
  }
}
