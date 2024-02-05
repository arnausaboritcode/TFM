import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Movie} from '../../../core/models/movie';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { NavbarShowHideService } from '../../services/navbar-show-hide.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  public movies:Movie[];
  public images:string[] = [];
  public currentImageIndex:number = 0;

  constructor(private moviesService: MoviesService,  private destroy$: AutoDestroyService, private navbarService: NavbarShowHideService){}

  ngOnInit(): void {
    this.navbarService.hide();

    this.moviesService.getNowPlayingMovies().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.movies = data.results;
    });

    for (let movie of this.movies) {
      this.images = [... this.images, movie.backdrop_path];
    }

    this.startImageInterval();
  }

  startImageInterval(): void {
    interval(15000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.changeBackgroundImage();
    });
  }

  changeBackgroundImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

}
