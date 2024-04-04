import { NgOptimizedImage } from '@angular/common'; //es standalone aixi que en teoria no shauria de ficar aqui. Aixo pasa pk no tenim components standalone.
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { register } from 'swiper/element/bundle';
register();

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
