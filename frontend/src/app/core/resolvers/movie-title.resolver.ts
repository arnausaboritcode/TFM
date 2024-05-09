import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, map, pluck, takeUntil } from 'rxjs';
import { MovieDetailsService } from '../../routes/services/movie-details.service';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class movieTitleResolver implements Resolve<string> {
  constructor(
    private movieDetailsService: MovieDetailsService,
    private destroy$: AutoDestroyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const movieId: string = route.paramMap.get('id') || '';
    return this.movieDetailsService.movieDetailsById(+movieId).pipe(
      takeUntil(this.destroy$),
      pluck('title'),
      map((title) => {
        return title ? `PopCorn - ${title}` : 'PopCorn - Movie';
      })
    );
  }
}
