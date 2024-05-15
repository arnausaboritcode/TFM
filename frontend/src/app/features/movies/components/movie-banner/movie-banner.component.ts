import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MovieDTO } from '../../../../core/models/movie.dto';

@Component({
  selector: 'app-movie-banner',
  templateUrl: './movie-banner.component.html',
  styleUrl: './movie-banner.component.scss',
})
export class MovieBannerComponent implements AfterViewInit {
  @ViewChild('swiperRef', { static: true }) protected _swiperRef!: ElementRef;
  @Input({ required: true }) movies: MovieDTO[];

  constructor() {
    this.movies = [];
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper() {
    const swiperEl = this._swiperRef.nativeElement;

    const swiperParams = {
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 5500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }
}
