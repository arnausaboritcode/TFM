import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MovieFavoriteService {
  //spinner
  private spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  spinner$: Observable<boolean> = this.spinner.asObservable();

  //Notify if movie are removed from favorites
  private movieRemovedOrAdded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  movieRemovedOrAdded$: Observable<boolean> =
    this.movieRemovedOrAdded.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  //Add movie to favorites
  addToFavorite(movie_id: number): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    const body = {
      movie_id: movie_id,
    };

    this.spinner.next(true);
    this.movieRemovedOrAdded.next(false);
    return this.http
      .post<any>(`${environment.api_url}/favorites/add`, body, {
        headers,
        withCredentials: true,
      })
      .pipe(
        /* delay(2000), */
        finalize(() => {
          this.movieRemovedOrAdded.next(true);
          this.spinner.next(false);
        })
      );
  }
  //Remove movie to favorites
  removeToFavorite(movie_id: number): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    const body = {
      movie_id: movie_id,
    };
    this.spinner.next(true);
    this.movieRemovedOrAdded.next(false);
    return this.http
      .delete<any>(`${environment.api_url}/favorites/remove`, {
        headers,
        body,
        withCredentials: true,
      })
      .pipe(
        /* delay(2000), */
        finalize(() => {
          this.spinner.next(false);
          this.movieRemovedOrAdded.next(true);
        })
      );
  }

  //Get all user favorite movies
  getFavoriteMovies(): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    this.spinner.next(true);
    return this.http.get<Observable<any>>(`${environment.api_url}/favorites`, {
      headers,
      withCredentials: true,
    });
  }

  //Get all favorite movies from all users
  getAllFavoriteMovies(): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    this.spinner.next(true);
    return this.http
      .get<Observable<any>>(`${environment.api_url}/favorites/all`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        /* delay(500), */
        finalize(() => this.spinner.next(false))
      );
  }
}
