import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { LandingPageComponent } from './routes/pages/landing-page/landing-page.component';
import { WelcomePageComponent } from './routes/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies/search', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'movies/search',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
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
