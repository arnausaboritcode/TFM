import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { LandingPageComponent } from './routes/pages/landing-page/landing-page.component';
import { WelcomePageComponent } from './routes/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    title: 'PopCorn - Welcome',
  },
  {
    path: 'movies/search',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    title: 'PopCorn - Home',
  },
  { path: 'user/login', component: LoginComponent, title: 'PopCorn - Login' },
  {
    path: 'user/register',
    component: RegisterComponent,
    title: 'PopCorn - Register',
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
