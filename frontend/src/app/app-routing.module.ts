import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoviesPageComponent } from './routes/pages/movies-page/movies-page.component';
import { SearchPageComponent } from './routes/pages/search-page/search-page.component';
import { MovieDetailPageComponent } from './routes/pages/movie-detail-page/movie-detail-page.component';
import { UserProfilePageComponent } from './routes/pages/user-profile-page/user-profile-page.component';
import { userProfileResolver } from './core/resolvers/user-profile.resolver';
import { HomePageComponent } from './routes/pages/home-page/home-page.component';



const routes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  { path: 'home', component: MoviesPageComponent },
  { path: 'first', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfilePageComponent, resolve: { userProfileData: userProfileResolver }  },
  { path: ':id', component: MovieDetailPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
