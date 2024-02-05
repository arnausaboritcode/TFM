import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-movie-carrousel',
  templateUrl: './movie-carrousel.component.html',
  styleUrl: './movie-carrousel.component.scss'
})
export class MovieCarrouselComponent implements AfterViewInit {
  @Input({ required: true }) movies:Movie[];
  @Input({ required: true }) title:string;
  @ViewChild('swiperRef', { static: true }) protected _swiperRef: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {
    this.initSwiper();
   }

   private initSwiper() {
    const swiperEl = this._swiperRef.nativeElement;

    const swiperParams = {
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 5,
      centeredSlides: true,
      loop: true,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            opacity: 0;
            transition: opacity 0.6s ease 0s, box-shadow 0.3s ease 0s;
          }
          .swiper:hover .swiper-button-next,
          .swiper:hover .swiper-button-prev {
            opacity: 1;
            background-color: rgba(20,20,20,0.9);
            transition: opacity 0.6s ease 0s, box-shadow 0.3s ease 0s;

            -webkit-box-shadow:0px 0px 75px 105px rgba(20,20,20,0.9);
            -moz-box-shadow: 0px 0px 75px 105px rgba(20,20,20,0.9);
            box-shadow: 0px 0px 75px 105px rgba(20,20,20,0.9);
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
          .swiper:hover .swiper-horizontal > .swiper-pagination-bullets, .swiper:hover .swiper-pagination-bullets.swiper-pagination-horizontal{
            opacity:1;
          }

      `,
      ],
      breakpoints: {
        600: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 8,
          slidesPerGroup: 8,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 9,
          slidesPerGroup: 9,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    }

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();

  }
}
