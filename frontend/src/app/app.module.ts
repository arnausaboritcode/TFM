import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { register } from 'swiper/element/bundle';
register();

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { FooterComponent } from './core/main-layout/components/footer/footer.component';
import { HeaderComponent } from './core/main-layout/components/header/header.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { LandingPageComponent } from './routes/pages/landing-page/landing-page.component';
import { WelcomePageComponent } from './routes/pages/welcome-page/welcome-page.component';
import { PopcornSpinnerComponent } from './shared/popcorn-spinner/popcorn-spinner.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

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
    SnackbarComponent,
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
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatSnackBarModule,
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
