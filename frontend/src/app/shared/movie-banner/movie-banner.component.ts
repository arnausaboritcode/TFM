import { AfterViewInit, Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-movie-banner',
  templateUrl: './movie-banner.component.html',
  styleUrl: './movie-banner.component.scss'
})
export class MovieBannerComponent implements AfterViewInit {
  @ViewChild('swiperRef', { static: true }) protected _swiperRef: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {
    this.initSwiper();
   }

   private initSwiper() {
    const swiperEl = this._swiperRef.nativeElement;

    const swiperParams = {
      centeredSlides: true,
      loop: true,
      /* autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      }, */
      injectStyles: [
        `
          .swiper-pagination-bullet-active {
            background-color: white !important;
          }

          .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
            background-color: rgba(255,255,255, 0.5);
            margin:4px;
            width: 20px;
            height: 4px;
            border-radius: unset;
          }

          .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal{
            bottom:5%;
            top:auto;
          }
      `,
      ],
    }

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();

  }


}
