import { Component, Input, OnInit } from '@angular/core';
import { GenreDTO } from '../../../../core/models/genres.dto';

@Component({
  selector: 'app-genre-carrousel-card',
  templateUrl: './genre-carrousel-card.component.html',
  styleUrl: './genre-carrousel-card.component.scss',
})
export class GenreCarrouselCardComponent implements OnInit {
  @Input({ required: true }) genre!: GenreDTO;
  randomBgColor: string;

  constructor() {
    this.randomBgColor = '';
  }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor(): void {
    this.randomBgColor =
      '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
