import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './routes/auth/pages/login/login.component';
import { RegisterComponent } from './routes/auth/pages/register/register.component';
import { FavoriteLibraryComponent } from './routes/pages/components/favorite-library/favorite-library.component';
import { ProfilePageComponent } from './routes/pages/profile-page/profile-page.component';
import { SharedModule } from './shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfilePageComponent,
    FavoriteLibraryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule {}
