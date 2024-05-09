import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { register } from 'swiper/element/bundle';
import { MovieRoutingModule } from './movie-routing.module';
import { GenreCarrouselCardComponent } from './routes/pages/components/genre-carrousel-card/genre-carrousel-card.component';
import { GenreCarrouselComponent } from './routes/pages/components/genre-carrousel/genre-carrousel.component';
import { MovieBannerComponent } from './routes/pages/components/movie-banner/movie-banner.component';
import { MovieCarrouselCardComponent } from './routes/pages/components/movie-carrousel-card/movie-carrousel-card.component';
import { MovieCarrouselComponent } from './routes/pages/components/movie-carrousel/movie-carrousel.component';
import { MovieDetailSkeletonComponent } from './routes/pages/components/movie-detail-skeleton/movie-detail-skeleton.component';
import { MovieListsSkeletonComponent } from './routes/pages/components/movie-lists-skeleton/movie-lists-skeleton.component';
import { GenrePageComponent } from './routes/pages/genre-page/genre-page.component';
import { LandingPageComponent } from './routes/pages/landing-page/landing-page.component';
import { MovieDetailPageComponent } from './routes/pages/movie-detail-page/movie-detail-page.component';
import { MovieListsPageComponent } from './routes/pages/movie-lists-page/movie-lists-page.component';
import { SharedModule } from './shared.module';
import { DescriptionLimitPipe } from './shared/pipes/description-limit.pipe';
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
