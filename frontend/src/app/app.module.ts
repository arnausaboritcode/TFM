import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
register();
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgOptimizedImage } from '@angular/common'; //es standalone aixi que en teoria no shauria de ficar aqui. Aixo pasa pk no tenim components standalone.


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { HeaderComponent } from './core/main-layout/components/header/header.component';
import { FooterComponent } from './core/main-layout/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { MovieCarrouselComponent } from './shared/movie-carrousel/movie-carrousel.component';
import { MoviesPageComponent } from './routes/pages/movies-page/movies-page.component';
import { MovieCardComponent } from './shared/movie-card/movie-card.component';
import { SearchPageComponent } from './routes/pages/search-page/search-page.component';
import { MovieSearchListComponent } from './shared/movie-search-list/movie-search-list.component';
import { MovieDetailPageComponent } from './routes/pages/movie-detail-page/movie-detail-page.component';
import { DescriptionLimitPipe } from './shared/pipes/description-limit.pipe';
import { ImageUrlPipe } from './shared/pipes/image-url.pipe';
import { MovieSearchCardComponent } from './shared/movie-search-card/movie-search-card.component';
import { GenresLimitPipe } from './shared/pipes/genres-limit.pipe';
import { SkeletonComponent } from './shared/skeleton/skeleton.component';
import { SearchListSkeletonComponent } from './shared/search-list-skeleton/search-list-skeleton.component';
import { MovieDetailsSkeletonComponent } from './shared/movie-details-skeleton/movie-details-skeleton.component';
import { MovieBannerComponent } from './shared/movie-banner/movie-banner.component';
import { UserProfilePageComponent } from './routes/pages/user-profile-page/user-profile-page.component';
import { HomePageComponent } from './routes/pages/home-page/home-page.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    MoviesPageComponent,
    MovieCarrouselComponent,
    MovieCardComponent,
    SearchPageComponent,
    MovieSearchListComponent,
    MovieDetailPageComponent,
    DescriptionLimitPipe,
    ImageUrlPipe,
    MovieSearchCardComponent,
    GenresLimitPipe,
    SkeletonComponent,
    SearchListSkeletonComponent,
    MovieDetailsSkeletonComponent,
    MovieBannerComponent,
    UserProfilePageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    InfiniteScrollModule,
    NgOptimizedImage



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
