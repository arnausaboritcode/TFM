import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-lists-skeleton',
  templateUrl: './movie-lists-skeleton.component.html',
  styleUrl: './movie-lists-skeleton.component.scss',
})
export class MovieListsSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
