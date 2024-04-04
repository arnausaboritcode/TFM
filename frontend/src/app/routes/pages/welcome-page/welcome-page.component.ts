import { Component, OnInit } from '@angular/core';
import { delay, distinctUntilChanged, startWith, takeUntil } from 'rxjs';
import { Movie } from '../../../core/models/movie';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { HeaderService } from '../../services/header.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  movies: Movie[];
  skeleton: boolean;
  windowScrolled: boolean;

  constructor(
    private moviesService: MoviesService,
    private destroy$: AutoDestroyService,
    private headerService: HeaderService
  ) {
    this.movies = [];
    this.skeleton = true;
    this.windowScrolled = false;
  }

  ngOnInit(): void {
    //Hide Navbar
    this.headerService.hide();

    //Load movies
    this.moviesService
      .getNowPlayingMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movies = data.results;
      });

    //Skeleton
    this.moviesService.skeleton$
      .pipe(
        delay(2000),
        takeUntil(this.destroy$),
        startWith(this.skeleton),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.skeleton = value;
      });

    //Scroll
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.windowScrolled = window.pageYOffset !== 0;
        console.log('scrolled');
      });
    }
  }

  //Scroll when clicking arrow
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to ' + el.getAttribute('id'));
  }
  //Scroll to top
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
