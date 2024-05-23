import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { userDataResolver } from '../../core/resolvers/user-data.resolver';
import { FavoriteLibraryComponent } from './components/favorite-library/favorite-library.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterComponent } from './pages/register/register.component';

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
