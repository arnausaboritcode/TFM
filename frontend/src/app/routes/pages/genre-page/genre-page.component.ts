import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Subject,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FiltersDTO } from '../../../core/models/filters.dto';
import { GenreDTO } from '../../../core/models/movie-details.dto';
import { MovieDTO } from '../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrl: './genre-page.component.scss',
})
export class GenrePageComponent implements OnInit {
  //Movie list
  genreMovies: MovieDTO[];
  totalResults: number;
  //Genre id
  genreId: string;
  genresIds: string[] = [];
  genreNames: GenreDTO[] = [];

  //Default filters
  filters: FiltersDTO = {
    page: 1,
    include_adult: true,
  };

  //filters form and inputs
  filtersForm: FormGroup;
  year: FormControl;
  vote_average: FormControl;
  runtime: FormControl;
  language: FormControl;
  genres: FormControl;

  //Subject to observe select value changes
  onFilterChange$: Subject<FiltersDTO> = new Subject<FiltersDTO>();

  //Skeleton
  skeleton: boolean;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private destroy$: AutoDestroyService,
    private formBuilder: FormBuilder
  ) {
    this.genreMovies = [];
    this.totalResults = 0;
    this.genreId = '0';
    this.skeleton = false;

    this.year = new FormControl(['default'], []);
    this.vote_average = new FormControl(['default'], []);
    this.runtime = new FormControl(['default'], []);
    this.language = new FormControl(['default'], []);
    this.genres = new FormControl(['default'], []);

    this.filtersForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    //Getting id from url params and doing the subscriptions
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => {
          this.genreId = params['id'];
          this.genresIds.push(this.genreId);
        })
      )
      .subscribe(() => {
        //Assigning genreId to filter
        this.filters = { ...this.filters, with_genres: this.genresIds };
        //Getting movie detailed information
        this.moviesService.getDiscoverMovies(this.filters).subscribe((data) => {
          this.genreMovies = data.results;
          this.totalResults = data.total_results;
        });
      });

    //Initialize form and filter changes logic
    this.initForm();
    this.subscribeToFiltersChanges();

    //Get all genres
    this.getAllGenres();

    //skeleton
    this.moviesService.skeleton$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.skeleton),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.skeleton = value;
      });
  }

  initForm(): void {
    this.filtersForm = this.formBuilder.group({
      year: this.year,
      vote_average: this.vote_average,
      runtime: this.runtime,
      language: this.language,
      genres: this.genres,
    });

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const year = this.filtersForm.controls['year'].value;
        const vote_average = this.filtersForm.controls['vote_average'].value;
        const runtime = this.filtersForm.controls['runtime'].value;
        const with_original_language =
          this.filtersForm.controls['language'].value;

        const with_genres = this.genresIds.push(
          this.filtersForm.controls['genres'].value
        );

        this.filters = {
          ...this.filters,
          year,
          'vote_average.gte': vote_average,
          'with_runtime.gte': runtime,
          with_original_language,
        };
        this.onFilterChange$.next(this.filters);
      });
  }

  subscribeToFiltersChanges(): void {
    this.onFilterChange$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((filters: FiltersDTO) =>
          this.moviesService.getDiscoverMovies(filters)
        )
      )
      .subscribe((data) => {
        this.genreMovies = data.results;
        this.totalResults = data.total_results;
      });
  }

  getAllGenres(): void {
    this.moviesService
      .getMovieGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.genres.forEach((genre) => this.genreNames.push(genre));
      });
  }

  //Track genre by id
  trackById(index: number, item: any): any {
    return item.id;
  }
}
