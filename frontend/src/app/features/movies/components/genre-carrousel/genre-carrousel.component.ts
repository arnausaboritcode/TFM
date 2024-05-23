import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { GenreDTO } from '../../../../core/models/genres.dto';

@Component({
  selector: 'app-genre-carrousel',
  templateUrl: './genre-carrousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './genre-carrousel.component.scss',
})
export class GenreCarrouselComponent implements AfterViewInit {
  @Input({ required: true }) genres!: GenreDTO[];
  @Input({ required: true }) title: string;
  @ViewChild('swiperRef', { static: true }) protected _swiperRef!: ElementRef;

  constructor() {
    this.title = '';
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper() {
    const swiperEl = this._swiperRef.nativeElement;

    const swiperParams = {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 5,
      loop: true,
      loopAddBlankSlides: false,
      centeredSlides: false,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgba(20,20,20,0.9);
            background-position: center;
            background-size: 40px;
            background-repeat: no-repeat;
            padding: 8px 20px;
            color: white;
            opacity: 0;
            transition: opacity 0.2s ease 0s, box-shadow 0.4s ease 0s;
            box-shadow: 0px 0px 0px 0px rgba(20,20,20,0.9);
          }
          .swiper:hover .swiper-button-next,
          .swiper:hover .swiper-button-prev {
            opacity: 1;
            transition: opacity 0.2s ease 0s, box-shadow 0.4s ease 0s;
            box-shadow: 0px 0px 65px 80px rgba(20,20,20,0.9);
          }

          @media (max-width: 1024px) {
            .swiper-button-next, .swiper-button-prev {
              opacity: 0 !important;
            }
           }

          .swiper-pagination-bullet-active {
            background-color: white !important;
          }

          .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {

            background-color: rgba(255,255,255, 0.5);
            margin:2px;
            width: 10px;
            height: 2px;
            border-radius: unset;
          }

          .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal{
            opacity:0;
            top:0;
            left:45%;
            bottom:auto;

          }
          @media (min-width: 1024px) {
          .swiper:hover .swiper-horizontal > .swiper-pagination-bullets, .swiper:hover .swiper-pagination-bullets.swiper-pagination-horizontal{
            opacity:1;
          }
        }
      `,
      ],
      breakpoints: {
        600: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 6,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 7,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }
}
