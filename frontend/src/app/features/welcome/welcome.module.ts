import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, WelcomeRoutingModule, NgOptimizedImage, SharedModule],
})
export class WelcomeModule {}
