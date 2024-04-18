import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-skeleton',
  templateUrl: './results-skeleton.component.html',
  styleUrl: './results-skeleton.component.scss',
})
export class ResultsSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
