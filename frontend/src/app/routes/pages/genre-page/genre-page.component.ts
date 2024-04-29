import { Location } from '@angular/common';
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
  tap,
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
  totalPages: number;
  //Genre id
  genreId: string;
  genresIds: string[];
  genresKeyvalue: GenreDTO[] = [];

  //Default filters
  filters: FiltersDTO = {
    page: 1,
  };

  //filters form and inputs
  filtersForm: FormGroup;
  year: FormControl;
  vote_average: FormControl;
  runtime: FormControl;
  language: FormControl;
  with_genres: FormControl;
  control: FormControl;

  //Subject to observe select value changes
  onFilterChange$: Subject<FiltersDTO> = new Subject<FiltersDTO>();

  //Skeleton
  skeleton: boolean;

  windowScrolled: boolean;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private destroy$: AutoDestroyService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.genreMovies = [];
    this.genresIds = [];
    this.totalResults = 0;
    this.totalPages = 1;
    this.genreId = '0';
    this.skeleton = false;
    this.windowScrolled = false;

    this.year = new FormControl('', []);
    this.vote_average = new FormControl('', []);
    this.runtime = new FormControl('', []);
    this.language = new FormControl('', []);
    this.with_genres = new FormControl('', []);
    this.control = new FormControl('', []);

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
        this.filters = {
          ...this.filters,
          with_genres: this.genresIds.join(','),
        };
        //Getting movie detailed information
        this.moviesService.getDiscoverMovies(this.filters).subscribe((data) => {
          this.genreMovies = data.results;
          this.totalResults = data.total_results;
          this.totalPages = data.total_pages;
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

    //Get "Search Results" element scroll position to show fixed section
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const element = document.getElementById('searchResults');
        if (element) {
          const rect = element.getBoundingClientRect();
          this.windowScrolled = rect.bottom <= 0;
        }
      });
    }
  }

  initForm(): void {
    this.filtersForm = this.formBuilder.group({
      'primary_release_date.lte': this.year,
      'vote_average.gte': this.vote_average,
      'with_runtime.lte': this.runtime,
      with_original_language: this.language,
      with_genres: this.with_genres,
      include_adult: this.control,
    });

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const year =
          this.filtersForm.controls['primary_release_date.lte'].value;
        const vote_average =
          this.filtersForm.controls['vote_average.gte'].value;
        const runtime = this.filtersForm.controls['with_runtime.lte'].value;
        const with_original_language =
          this.filtersForm.controls['with_original_language'].value;
        const include_adult = this.filtersForm.controls['include_adult'].value;
        const newGenreId = this.filtersForm.controls['with_genres'].value;

        if (!this.genresIds.includes(newGenreId) && newGenreId !== '') {
          this.genresIds.push(newGenreId);
        }

        //Add new filters
        this.filters = {
          ...this.filters,
          'primary_release_date.lte': year,
          'vote_average.gte': vote_average,
          'with_runtime.lte': runtime,
          with_original_language,
          with_genres: this.genresIds.join(','),
          include_adult,
        };

        this.onFilterChange$.next(this.filters);
      });
  }

  subscribeToFiltersChanges(): void {
    this.onFilterChange$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.genreMovies = [])),
        switchMap((filters: FiltersDTO) =>
          this.moviesService.getDiscoverMovies(filters)
        )
      )
      .subscribe((data) => {
        this.genreMovies = data.results;
        this.totalResults = data.total_results;
        this.totalPages = data.total_pages;
        this.filters.page = 1;
      });
  }

  getAllGenres(): void {
    this.moviesService
      .getMovieGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.genres.forEach((genre) => this.genresKeyvalue.push(genre));
      });
  }

  //Track genre by id
  trackById(index: number, item: any): any {
    return item.id;
  }

  //Infinite-scroll
  onScroll(): void {
    if (this.filters.page! < this.totalPages && this.genreMovies.length > 0) {
      this.filters.page!++;
      this.moviesService.getDiscoverMovies(this.filters).subscribe((data) => {
        this.genreMovies.push(...data.results);
      });
    }
  }

  //Scroll to top
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  //Go back page
  goBack(): void {
    this.location.back();
  }

  //remove filter parameter and reinitialize select
  removeFilter(property: keyof FiltersDTO): void {
    delete this.filters[property];
    this.filtersForm.controls[property].setValue('');
    this.onFilterChange$.next(this.filters);
  }

  //clear genres added
  clearGenreAdded(): void {
    this.genresIds.splice(1);
    this.filters.with_genres = this.filters
      .with_genres!.split(',')
      .splice(1)
      .toString();
    this.filtersForm.controls['with_genres'].setValue('');
    this.onFilterChange$.next(this.filters);
  }
}
