import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ResultsCardComponent } from './components/results-card/results-card.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { ResultsSkeletonComponent } from './components/results-skeleton/results-skeleton.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GenresLimitPipe } from './pipes/genres-limit.pipe';
import { ImageUrlPipe } from './pipes/image-url.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    ResultsListComponent,
    ResultsCardComponent,
    ResultsSkeletonComponent,
    GenresLimitPipe,
    ImageUrlPipe,
  ],
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  exports: [
    SpinnerComponent,
    ResultsListComponent,
    ResultsCardComponent,
    ResultsSkeletonComponent,
    GenresLimitPipe,
    ImageUrlPipe,
  ],
})
export class SharedModule {}
