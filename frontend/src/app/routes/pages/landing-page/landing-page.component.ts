import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { MovieDTO } from '../../../core/models/movie.dto';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { HeaderService } from '../../services/header.service';
import { MovieSearchService } from '../../services/movie-search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  results: MovieDTO[];
  query: string;
  closestMatchedQuery: string;

  skeleton: boolean;

  page: number;
  totalPages: number;
  totalResults: number;

  windowScrolled: boolean;

  constructor(
    private headerService: HeaderService,
    private movieSearchService: MovieSearchService,
    private destroy$: AutoDestroyService
  ) {
    this.results = [];
    this.closestMatchedQuery = '';
    this.query = '';
    this.skeleton = false;
    this.page = 1;
    this.totalPages = 10;
    this.totalResults = 0;
    this.windowScrolled = false;

    // Resets search results on reenter page after route change
    this.subscribeToInputChanges();
  }

  ngOnInit(): void {
    this.headerService.show();

    //Get results of searched query
    this.movieSearchService.searchTerms$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        //Before we full new results, we empty the previous ones
        tap(() => (this.results = [])),
        switchMap((query: string) =>
          this.movieSearchService.searchMovies(query)
        )
      )
      .subscribe((data) => {
        this.results = data.results;
        this.totalResults = data.total_results;
        this.totalPages = data.total_pages;
        this.page = 1;
        this.getClosestMatchedQuery(this.results);
      });

    //Skeleton
    this.movieSearchService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.skeleton = value;
      });

    //Get "Search Results count" element scroll position for showing instead fixed section
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const element = document.getElementById('searchResultsCount');
        if (element) {
          const rect = element.getBoundingClientRect();
          this.windowScrolled =
            rect.top >= window.innerHeight || rect.bottom <= 0;
        }
      });
    }
  }

  //Notifies that query has changed and assigns query params on route
  subscribeToInputChanges(): void {
    this.movieSearchService.setQueryString(this.query);
  }

  //Defines levenshteinDistance method for finding the most similar query match
  levenshteinDistance(a: string, b: string): number {
    const dp: number[][] = Array.from(Array(a.length + 1), () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[a.length][b.length];
  }

  //Suggested query through levenshteinDistance method
  getClosestMatchedQuery(movies: MovieDTO[]): void {
    let minDistance: number = Infinity;
    movies.forEach((data) => {
      if (this.query && this.query.trim() !== '') {
        const distance = this.levenshteinDistance(
          data.title.toLowerCase(),
          this.query.toLowerCase()
        );
        if (distance < minDistance) {
          minDistance = distance;
          this.closestMatchedQuery = data.title;
        }
      }
    });
  }

  //Change query to the suggested one
  changeInputQuery(): void {
    this.query = this.closestMatchedQuery;
    this.subscribeToInputChanges();
  }

  //Infinite-scroll
  onScroll(): void {
    if (this.page <= this.totalPages && this.results.length > 0) {
      this.movieSearchService
        .searchMovies(this.query, ++this.page)
        .subscribe((data) => {
          this.results.push(...data.results);
        });
    }
  }

  //Scroll to top
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
