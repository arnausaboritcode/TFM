import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { MovieDetailsDTO } from '../../../core/models/movie-details.dto';
import { SearchResultDTO } from '../../../core/models/movie.dto';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  //Skeleton
  private skeleton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public skeleton$: Observable<boolean> = this.skeleton.asObservable();

  constructor(private http: HttpClient) {}

  movieDetailsById(id: number): Observable<MovieDetailsDTO> {
    this.skeleton.next(true);
    return this.http
      .get<MovieDetailsDTO>(`${environment.BASE_API_URL_FRONTEND}movie/${id}`)
      .pipe(
        delay(500),
        finalize(() => this.skeleton.next(false))
      );
  }

  movieListSimilar(id: number): Observable<SearchResultDTO> {
    return this.http.get<SearchResultDTO>(
      `${environment.BASE_API_URL_FRONTEND}movie/${id}/similar`
    );
  }
}
