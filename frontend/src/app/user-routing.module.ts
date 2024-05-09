import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { userDataResolver } from './core/resolvers/user-data.resolver';
import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { FavoriteLibraryComponent } from './routes/pages/components/favorite-library/favorite-library.component';
import { ProfilePageComponent } from './routes/pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'PopCorn - Login' },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'PopCorn - Register',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
    resolve: { userData: userDataResolver },
    children: [{ path: '', component: FavoriteLibraryComponent }],
    title: 'PopCorn - Profile',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
