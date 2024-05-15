import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { register } from 'swiper/element/bundle';
import { DescriptionLimitPipe } from '../../shared/pipes/description-limit.pipe';
import { SharedModule } from '../../shared/shared.module';
import { GenreCarrouselCardComponent } from './components/genre-carrousel-card/genre-carrousel-card.component';
import { GenreCarrouselComponent } from './components/genre-carrousel/genre-carrousel.component';
import { MovieBannerComponent } from './components/movie-banner/movie-banner.component';
import { MovieCarrouselCardComponent } from './components/movie-carrousel-card/movie-carrousel-card.component';
import { MovieCarrouselComponent } from './components/movie-carrousel/movie-carrousel.component';
import { MovieDetailSkeletonComponent } from './components/movie-detail-skeleton/movie-detail-skeleton.component';
import { MovieListsSkeletonComponent } from './components/movie-lists-skeleton/movie-lists-skeleton.component';
import { MovieRoutingModule } from './movie-routing.module';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { MovieListsPageComponent } from './pages/movie-lists-page/movie-lists-page.component';
register();

@NgModule({
  declarations: [
    LandingPageComponent,
    MovieListsPageComponent,
    MovieDetailPageComponent,
    GenrePageComponent,

    MovieListsPageComponent,
    MovieCarrouselComponent,
    MovieCarrouselCardComponent,
    MovieBannerComponent,
    GenreCarrouselComponent,
    GenreCarrouselCardComponent,
    MovieListsSkeletonComponent,
    MovieDetailPageComponent,
    DescriptionLimitPipe,
    MovieDetailSkeletonComponent,
    GenrePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    InfiniteScrollModule,
    SharedModule,
    NgOptimizedImage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieModule {}
