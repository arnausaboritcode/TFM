import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ResultsCardComponent } from './shared/components/results-card/results-card.component';
import { ResultsListComponent } from './shared/components/results-list/results-list.component';
import { ResultsSkeletonComponent } from './shared/components/results-skeleton/results-skeleton.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { GenresLimitPipe } from './shared/pipes/genres-limit.pipe';
import { ImageUrlPipe } from './shared/pipes/image-url.pipe';

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
