import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MovieDTO } from '../../../../core/models/movie.dto';
import { HeaderService } from '../../../../core/services/common/header.service';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { MoviesService } from '../../../movies/services/movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  movies: MovieDTO[];

  windowScrolled: boolean;

  //skeleton
  skeleton:boolean;

  constructor(
    private moviesService: MoviesService,
    private destroy$: AutoDestroyService,
    private headerService: HeaderService
  ) {
    this.movies = [];
    this.skeleton = false;
    this.windowScrolled = false;
  }

  ngOnInit(): void {
    this.headerService.hide();

    //Load banner movie for showing his image
    this.moviesService
      .getNowPlayingMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movies = data.results;
      });

    //skeleton value
    this.moviesService.skeleton$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.skeleton = value;
      });

    //Detect if page was scrolled
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.windowScrolled = window.pageYOffset !== 0;
        console.log('scrolled');
      });
    }
  }

  //Scroll to a specific element
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolling to ' + el.getAttribute('id'));
  }

  //Scroll to top
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
