import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { register } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { FooterComponent } from './core/main-layout/components/footer/footer.component';
import { HeaderComponent } from './core/main-layout/components/header/header.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { FavoriteLibraryComponent } from './routes/pages/components/favorite-library/favorite-library.component';
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
import { ProfilePageComponent } from './routes/pages/profile-page/profile-page.component';
import { WelcomePageComponent } from './routes/pages/welcome-page/welcome-page.component';
import { PopcornSpinnerComponent } from './shared/components/popcorn-spinner/popcorn-spinner.component';
import { ResultsCardComponent } from './shared/components/results-card/results-card.component';
import { ResultsListComponent } from './shared/components/results-list/results-list.component';
import { ResultsSkeletonComponent } from './shared/components/results-skeleton/results-skeleton.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { DescriptionLimitPipe } from './shared/pipes/description-limit.pipe';
import { GenresLimitPipe } from './shared/pipes/genres-limit.pipe';
import { ImageUrlPipe } from './shared/pipes/image-url.pipe';
register();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    LandingPageComponent,
    WelcomePageComponent,
    SpinnerComponent,
    PopcornSpinnerComponent,
    ResultsSkeletonComponent,
    ResultsListComponent,
    ResultsCardComponent,
    ImageUrlPipe,
    GenresLimitPipe,
    MovieListsPageComponent,
    MovieCarrouselComponent,
    MovieCarrouselCardComponent,
    MovieBannerComponent,
    GenreCarrouselComponent,
    MovieListsSkeletonComponent,
    GenreCarrouselCardComponent,
    MovieDetailPageComponent,
    DescriptionLimitPipe,
    MovieDetailSkeletonComponent,
    GenrePageComponent,
    ProfilePageComponent,
    FavoriteLibraryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    InfiniteScrollModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
    provideClientHydration(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
