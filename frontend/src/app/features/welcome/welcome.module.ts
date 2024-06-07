import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeSkeletonComponent } from './components/welcome-skeleton/welcome-skeleton.component';

@NgModule({
  declarations: [WelcomePageComponent, WelcomeSkeletonComponent],
  imports: [CommonModule, WelcomeRoutingModule, NgOptimizedImage, SharedModule],
})
export class WelcomeModule {}
