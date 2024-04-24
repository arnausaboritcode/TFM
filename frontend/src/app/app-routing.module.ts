import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { customtitleResolver } from './core/resolvers/customtitle.resolver';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { GenrePageComponent } from './routes/pages/genre-page/genre-page.component';
import { LandingPageComponent } from './routes/pages/landing-page/landing-page.component';
import { MovieDetailPageComponent } from './routes/pages/movie-detail-page/movie-detail-page.component';
import { MovieListsPageComponent } from './routes/pages/movie-lists-page/movie-lists-page.component';
import { WelcomePageComponent } from './routes/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    title: 'PopCorn - Welcome',
  },
  { path: 'user/login', component: LoginComponent, title: 'PopCorn - Login' },
  {
    path: 'user/register',
    component: RegisterComponent,
    title: 'PopCorn - Register',
  },
  {
    path: 'movies/search',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Home',
  },
  {
    path: 'movies/lists',
    component: MovieListsPageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Movies',
  },
  {
    path: 'movies/:id',
    component: MovieDetailPageComponent,
    canActivate: [AuthGuard],
    title: customtitleResolver,
  },
  {
    path: 'movies/genres/:id',
    component: GenrePageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Genre name',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableViewTransitions: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
