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
  randomPattern: string;

  constructor() {
    this.randomBgColor = '';
    this.randomPattern = '';
  }

  ngOnInit(): void {
    this.getRandomColor();
    this.fullRandomPatterns();
  }

  getRandomColor(): void {
    this.randomBgColor =
      '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  //All aviable patterns on tailwindcss-patterns plugin
  fullRandomPatterns(): void {
    const allPatterns = [
      'jigsaw',
      'ripples',
      'topography',
      'texture',
      'hub',
      'architect',
      'voxel',
      'crosses',
      'graph',
      'squares',
      'falling-triangles',
      'pies',
      'hexagons',
      'zig-zag',
      'zig-zag-2',
      'autumn',
      'temple',
      'death-star',
      'overlapping-hexagons',
      'stars',
      'bamboo',
      'floor',
      'cork-screw',
      'kiwi',
      'lips',
      'checkered',
      'x-equals',
      'bevel-circle',
      'brick-wall',
      'fancy-rectangles',
      'heavy-rain',
      'overlapping-circles',
      'plus',
      'plus-connected',
      'volcano-lamp',
      'wiggle',
      'bubbles',
      'cage',
      'connections',
      'current',
      'diagonal-stripes',
      'flipped-diamonds',
      'houndstooth',
      'leaf',
      'lines-in-motion',
      'moroccan',
      'morphing-diamonds',
      'rails',
      'rain',
      'squares-in-squares',
      'stripes',
      'tic-tac-toe',
      'aztec',
      'bank-note',
      'boxes',
      'circles-and-squares',
      'circuit-board',
      'curtain',
      'clouds',
      'eyes',
      'tiles',
      'groovy',
      'intersecting-circles',
      'melt',
      'overlapping-diamonds',
      'wood',
      'polka',
      'signal',
      'slanted',
      'lines-diagonal-right',
      'lines-diagonal-left',
      'lines-horizontal',
      'lines-vertical',
      'sprinkles',
      'waves',
      'hive',
      'squiggles',
      'triangles',
      'grid',
      'zebra',
    ];

    this.randomPattern =
      allPatterns[Math.floor(Math.random() * allPatterns.length)];
  }
}
