import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs';
import { MovieDetailsDTO } from '../../../core/models/movie-details.dto';
import { MovieDTO, SearchResultDTO } from '../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MovieDetailsService } from '../../services/movie-details.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
  movieDetails!: MovieDetailsDTO;
  movideId: number;
  showMoreToggle: boolean;

  //Similar movies list
  similarMovies: MovieDTO[];

  //skeleton
  skeleton: boolean;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private destroy$: AutoDestroyService,
    private location: Location
  ) {
    this.movideId = 0;
    this.showMoreToggle = false;
    this.skeleton = false;
    this.similarMovies = [];
  }

  ngOnInit(): void {
    //Getting id from url params and doing the subscriptions
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => {
          let moveIdString = params['id'];
          this.movideId = +moveIdString!;
        })
      )
      .subscribe(() => {
        //Getting movie detailed information
        this.movieDetailsService
          .movieDetailsById(this.movideId)
          .subscribe((data: MovieDetailsDTO) => (this.movieDetails = data));

        //Getting similar movies list information
        this.movieDetailsService
          .movieListSimilar(this.movideId)
          .subscribe(
            (data: SearchResultDTO) => (this.similarMovies = data.results)
          );
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
  }

  onShow(): void {
    this.showMoreToggle = !this.showMoreToggle;
  }

  goBack(): void {
    this.location.back();
  }
}
