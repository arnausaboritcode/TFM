import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { genreTitleResolver } from '../../core/resolvers/genre-title.resolver';
import { movieTitleResolver } from '../../core/resolvers/movie-title.resolver';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { MovieListsPageComponent } from './pages/movie-lists-page/movie-lists-page.component';

const routes: Routes = [
  {
    path: 'search',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Home',
  },
  {
    path: 'lists',
    component: MovieListsPageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Movies',
  },
  {
    path: ':id',
    component: MovieDetailPageComponent,
    canActivate: [AuthGuard],
    title: movieTitleResolver,
  },
  {
    path: 'genres/:id',
    component: GenrePageComponent,
    canActivate: [AuthGuard],
    title: genreTitleResolver,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
