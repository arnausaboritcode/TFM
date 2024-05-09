import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs';
import { MovieDetailsDTO } from '../../../core/models/movie-details.dto';
import { MovieDTO, SearchResultDTO } from '../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieFavoriteService } from '../../services/movie-favorite.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
  movieDetails!: MovieDetailsDTO;
  movieId: number;
  showMoreToggle: boolean;

  //Similar movies list
  similarMovies: MovieDTO[];

  //Loading elements
  skeleton: boolean;
  spinner: boolean;
  usersSpinner: boolean;

  isFavorite!: boolean;

  //Users mthat have favorite movie
  usersIdsFav: number[];
  usersNamesFav: string[];

  //Actual user id
  actualUserId: number;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private destroy$: AutoDestroyService,
    private location: Location,
    private movieFavoriteService: MovieFavoriteService,
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
    //Getting id from url params and doing the subscriptions
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => {
          //Getting id params from url. Also, detect changes of this params
          let moveIdString = params['id'];
          this.movieId = +moveIdString!;
          //Initialize variables as empty every time params changed
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

        //Getting similar movies list information
        this.movieDetailsService
          .movieListSimilar(this.movieId)
          .subscribe(
            (data: SearchResultDTO) => (this.similarMovies = data.results)
          );

        //check if actual movie are favourite or not
        this.getUserFavMovies();

        //Getting all favorite movies
        this.getAllFavMovies();

        //Getting actual user id
        this.getUserInfo();

        //Getting all users info
        this.getAllUsersInfo();

        //Update likes count and users names when favorite is added or removed
        this.movieFavoriteService.movieRemovedOrAdded$.subscribe((changed) => {
          if (changed) {
            this.getAllFavMovies();
            this.getAllUsersInfo();
          }
        });
      });

    //skeleton
    this.movieDetailsService.skeleton$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.skeleton),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.skeleton = value;
      });

    //spinner
    this.movieFavoriteService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.spinner),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.spinner = value;
      });

    //users spinner
    this.userService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.usersSpinner),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.usersSpinner = value;
      });
  }

  onShow(): void {
    this.showMoreToggle = !this.showMoreToggle;
  }

  goBack(): void {
    this.location.back();
  }

  addToFavorite(): void {
    this.movieFavoriteService
      .addToFavorite(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response.message);
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

  removeToFavorite(): void {
    this.movieFavoriteService
      .removeToFavorite(this.movieId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response.message);
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

  getUserFavMovies(): void {
    //check if actual movie are favourite or not
    this.movieFavoriteService
      .getFavoriteMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.favorites.forEach((movie: any) => {
          if (movie.movie_id === this.movieId) {
            this.isFavorite = true;
          }
        });
      });
  }

  getAllFavMovies(): void {
    //Find users id that also liked the movie
    this.movieFavoriteService
      .getAllFavoriteMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.usersIdsFav = [];
        data.favorites.forEach((movie: any) => {
          if (movie.movie_id === this.movieId) {
            this.usersIdsFav.push(movie.user_id);
          }
        });
      });
  }

  getUserInfo(): void {
    //Getting actual user id
    this.userService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.actualUserId = data.id;
      });
  }

  getAllUsersInfo(): void {
    //Find users names that also liked the movie
    this.userService
      .getAllUsersInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.usersNamesFav = [];
        data.users.forEach((user: any) => {
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
}
