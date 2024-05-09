import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, map, takeUntil } from 'rxjs';
import { MoviesService } from '../../routes/services/movies.service';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class genreTitleResolver implements Resolve<string> {
  constructor(
    private moviesService: MoviesService,
    private destroy$: AutoDestroyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const genreId: string = route.paramMap.get('id') || '';
    return this.moviesService.getMovieGenres().pipe(
      takeUntil(this.destroy$),
      map((genres) => {
        const genre = genres.genres.find((g) => g.id === +genreId);
        return genre ? `PopCorn - ${genre.name}` : 'PopCorn - Genre';
      })
    );
  }
}
