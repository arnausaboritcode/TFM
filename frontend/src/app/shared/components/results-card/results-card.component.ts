import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { GenreDTO } from '../../../core/models/genres.dto';
import { MovieDTO } from '../../../core/models/movie.dto';
import { NotificationService } from '../../../core/services/common/notification.service';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MoviesService } from '../../../features/movies/services/movies.service';
import { FavoriteService } from '../../../features/user/services/favorite.service';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrl: './results-card.component.scss',
})
export class ResultsCardComponent implements OnInit {
  @Input({ required: true }) movie!: MovieDTO;
  @Input({ required: false }) isEditing!: boolean;
  genres: Map<number, string> = new Map<number, string>();
  genresNames: string[] = [];

  constructor(
    private moviesService: MoviesService,
    private favoriteService: FavoriteService,
    private destroy$: AutoDestroyService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getGenresById();
  }

  getGenresById() {
    this.moviesService.getMovieGenres().subscribe((data) => {
      data.genres.forEach((genre: GenreDTO) =>
        this.genres.set(genre.id, genre.name)
      );
      for (let id of this.genres.keys()) {
        if (this.movie.genre_ids.includes(id)) {
          this.genresNames.push(this.genres.get(id)!);
        }
      }
    });
  }

  removeToFavorite(): void {
    this.favoriteService
      .removeToFavorite(this.movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.notificationService.showSuccess(
            `<p class="text-xs">Removed succesfully</p>`
          );
        },
      });
  }
}
