import { Component, Input } from '@angular/core';
import { MovieDTO } from '../../../core/models/movie.dto';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.scss',
})
export class ResultsListComponent {
  @Input({ required: true }) results: MovieDTO[];

  constructor() {
    this.results = [];
  }
}
