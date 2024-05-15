import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopcornSpinnerComponent } from '../shared/components/popcorn-spinner/popcorn-spinner.component';
import { SharedModule } from '../shared/shared.module';
import { authInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './main-layout/components/footer/footer.component';
import { HeaderComponent } from './main-layout/components/header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    PopcornSpinnerComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    PopcornSpinnerComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
