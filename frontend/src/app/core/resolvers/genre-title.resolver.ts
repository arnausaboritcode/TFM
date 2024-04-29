import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MoviesService } from '../../routes/services/movies.service';

@Injectable({
  providedIn: 'root',
})
export class genreTitleResolver implements Resolve<string> {
  constructor(private moviesService: MoviesService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const genreId: string = route.paramMap.get('id') || '';
    return this.moviesService.getMovieGenres().pipe(
      map((genres) => {
        const genre = genres.genres.find((g) => g.id === +genreId);
        return genre ? `PopCorn - ${genre.name}` : '';
      })
    );
  }
}
