import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import {
  FavoriteMoviesDTO,
  FavoritesDTO,
} from '../../../../core/models/favorites.dto';
import { MovieDetailsDTO } from '../../../../core/models/movie-details.dto';
import { MovieDTO, SearchResultDTO } from '../../../../core/models/movie.dto';
import {
  UserDataDTO,
  UsersDataDTO,
} from '../../../../core/models/user-data.dto';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { FavoriteService } from '../../../user/services/favorite.service';
import { UserService } from '../../../user/services/user.service';
import { MovieDetailsService } from '../../services/movie-details.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
  movieDetails!: MovieDetailsDTO;
  movieId: number;

  //Similar movies list
  similarMovies: MovieDTO[];

  //Checks if movie is favorite
  isFavorite!: boolean;

  //Description limit pipe
  showMoreToggle: boolean;
  descriptionLimit: number = 170;

  //Loading elements
  skeleton: boolean;
  spinner: boolean;
  usersSpinner: boolean;

  //Some users info
  usersIdsFav: number[];
  usersNamesFav: string[];
  actualUserId: number;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private destroy$: AutoDestroyService,
    private location: Location,
    private favoriteService: FavoriteService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.movieId = 0;
    this.showMoreToggle = false;
    this.skeleton = false;
    this.spinner = false;
    this.usersSpinner = false;
    this.similarMovies = [];
    this.usersIdsFav = [];
    this.usersNamesFav = [];
    this.actualUserId = 0;
  }

  ngOnInit(): void {
    //Getting id from url params. Also, detect changes of this params
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => {
          let moveIdString = params['id'];
          this.movieId = +moveIdString!;
          //Empty variables every time params changed
          this.isFavorite = false;
          this.usersIdsFav = [];
          this.usersNamesFav = [];
        })
      )
      .subscribe(() => {
        //Getting movie detailed information
        this.movieDetailsService
          .movieDetailsById(this.movieId)
          .subscribe((data: MovieDetailsDTO) => (this.movieDetails = data));

        //Getting similar movies list
        this.movieDetailsService
          .movieListSimilar(this.movieId)
          .subscribe(
            (data: SearchResultDTO) => (this.similarMovies = data.results)
          );

        //Check if actual movie is favorite
        this.getUserFavMovies();

        //Getting all favorite movies
        this.getAllFavMovies();

        //Getting actual user id
        this.getUserInfo();

        //Getting all users info
        this.getAllUsersInfo();

        //Update likes count and users names when favorite list is changed
        this.subscribeToChanges();
      });

    //skeleton
    this.movieDetailsService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.skeleton = value;
      });

    //spinner
    this.favoriteService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.spinner = value;
      });

    //users spinner
    this.userService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.usersSpinner = value;
      });
  }

  getUserFavMovies(): void {
    //check if actual movie are favourite or not
    this.favoriteService
      .getFavoriteMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: FavoritesDTO) => {
        data.favorites.forEach((movie: FavoriteMoviesDTO) => {
          if (movie.movie_id === this.movieId) {
            this.isFavorite = true;
          }
        });
      });
  }

  getAllFavMovies(): void {
    //Find users id that also liked the movie
    this.favoriteService
      .getAllFavoriteMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: FavoritesDTO) => {
        this.usersIdsFav = [];
        data.favorites.forEach((movie: FavoriteMoviesDTO) => {
          if (movie.movie_id === this.movieId) {
            this.usersIdsFav.push(movie.user_id);
          }
        });
      });
  }

  subscribeToChanges(): void {
    this.favoriteService.movieRemovedOrAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((changed) => {
        if (changed) {
          this.getAllFavMovies();
          this.getAllUsersInfo();
        }
      });
  }

  getUserInfo(): void {
    //Getting actual user id
    this.userService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: UserDataDTO) => {
        this.actualUserId = data.id;
      });
  }

  getAllUsersInfo(): void {
    //Find users names that also liked the movie
    this.userService
      .getAllUsersInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: UsersDataDTO) => {
        this.usersNamesFav = [];
        data.users.forEach((user: UserDataDTO) => {
          this.usersIdsFav.forEach((id) => {
            if (user.id === id) {
              if (user.id === this.actualUserId) {
                user.name = 'Me';
              }
              this.usersNamesFav.push(user.name);
            }
          });
        });
      });
  }

  //Adds actual movie to favorites
  addToFavorite(): void {
    this.favoriteService
      .addToFavorite(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isFavorite = !this.isFavorite;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.notificationService.showSuccess(
            `<p class="text-xs">Added succesfully</p>`
          );
        },
      });
  }

  //Removes actual movie from favorites
  removeToFavorite(): void {
    this.favoriteService
      .removeToFavorite(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isFavorite = !this.isFavorite;
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

  //Show/Hide full movie description
  onShow(): void {
    this.showMoreToggle = !this.showMoreToggle;
  }

  //Go back page
  goBack(): void {
    this.location.back();
  }
}
