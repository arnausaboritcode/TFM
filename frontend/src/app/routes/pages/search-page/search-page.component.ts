import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { MovieSearchService } from '../../services/movie-search.service';
import { Observable, takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap, share, BehaviorSubject, tap, Subject } from 'rxjs';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { Movie, SearchResult } from '../../../core/models/movie';
import { SearchFilters } from '../../../core/models/search-filters';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {

  public results: Movie[];
  public query:string = '';

  //skeleton
  public skeleton:boolean = false;
  //infinite scroll
  public page:number;
  public totalPages:number;
  public nextUrl:string = ``;
    //Filters
  public searchFilters:SearchFilters = {
    query:'',
    //include_adult:true,
    //language:'en-US',
    //primary_release_year:string,
    //region:string,
    //year:
  }
  //Formulari reactiu per agafar valors dels filtres
  public filtersForm: FormGroup;
  //Subject per observar al canvi de valor dels selects
  public onFilterChange$:Subject<SearchFilters> = new Subject<SearchFilters>();



  constructor(private movieSearchService: MovieSearchService, private destroy$: AutoDestroyService, private fb: FormBuilder){}

  ngOnInit(): void {
   this.initForm();
   this.subscribeToQueryChanges();
   this.subscribeToFiltersChange();

    //skeleton
    this.movieSearchService.skeleton$.pipe(
      (takeUntil(this.destroy$)),
      startWith(this.skeleton),
      distinctUntilChanged(),

    )
    .subscribe(value => {
      this.skeleton = value;
    })
  }


  initForm(){
    this.filtersForm = this.fb.group ({
      language: ['default'],
      date: ['default'],
      control: ['default']
    });
    this.subscribeToFormChanges();
  }

  subscribeToInputChanges() {
    this.movieSearchService.setQueryString(this.query);
  }

  subscribeToQueryChanges(){
    this.movieSearchService.searchTerms$.pipe(
      (takeUntil(this.destroy$)),
      distinctUntilChanged()
    )
    .subscribe((query:string) => {
      this.searchFilters = { ...this.searchFilters, query: query };
      this.onFilterChange$.next(this.searchFilters);
    })

  }

  subscribeToFiltersChange(){
    this.onFilterChange$.pipe((
      takeUntil(this.destroy$),
      switchMap((filters:SearchFilters) =>
        this.movieSearchService.searchMovie(filters)
      )
    )).subscribe((data)=> {
      this.results = data.results;
      //Infinite scroll
      this.totalPages = data.total_pages;
      this.page=1;
  })
  }

  subscribeToFormChanges(){
    this.filtersForm.valueChanges.pipe((takeUntil(this.destroy$))).subscribe(()=>{
      const language = this.filtersForm.controls['language'].value;
      const primary_release_year = this.filtersForm.controls['date'].value;
      const include_adult = this.filtersForm.controls['control'].value;
      this.searchFilters = { ...this.searchFilters, language, primary_release_year, include_adult };
      this.onFilterChange$.next(this.searchFilters);
    });


  }

  //Infinite Scroll
  onScroll(){
    this.page++;
    if(this.page <= this.totalPages){
      const params = new HttpParams({
        fromObject: { ...this.searchFilters }
      })
      this.nextUrl = `https://api.themoviedb.org/3/search/movie?page=${this.page}&${params}`;
      this.movieSearchService.searchMovie(undefined,this.nextUrl).subscribe(data => {
      if(this.nextUrl && this.nextUrl != null) {
          this.results = [...this.results, ...data.results];
        }})
    }
  }
}

