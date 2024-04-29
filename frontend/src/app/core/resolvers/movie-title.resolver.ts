import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, map, pluck } from 'rxjs';
import { MovieDetailsService } from '../../routes/services/movie-details.service';

@Injectable({
  providedIn: 'root',
})
export class movieTitleResolver implements Resolve<string> {
  constructor(private movieDetailsService: MovieDetailsService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const movieId: string = route.paramMap.get('id') || '';
    return this.movieDetailsService.movieDetailsById(+movieId).pipe(
      pluck('title'),
      map((title) => `PopCorn - ${title}`)
    );
  }
}
