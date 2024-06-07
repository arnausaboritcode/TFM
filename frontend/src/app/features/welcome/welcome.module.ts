import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeSpinnerComponent } from './components/welcome-spinner/welcome-spinner.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [WelcomePageComponent, WelcomeSpinnerComponent],
  imports: [CommonModule, WelcomeRoutingModule, NgOptimizedImage, SharedModule],
})
export class WelcomeModule {}
