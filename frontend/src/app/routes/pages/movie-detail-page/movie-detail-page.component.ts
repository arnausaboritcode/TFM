import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil,startWith, distinctUntilChanged } from 'rxjs';

import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetails } from '../../../core/models/movie-details';
import { MoviesService } from '../../services/movies.service';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss'
})
export class MovieDetailPageComponent implements OnInit {
  public movieDetails:MovieDetails;
  public movideId:number;
  //Similar
  public similarMovies:Movie[];

  public showMore:boolean = false;
  public descriptionMaxLength: number = 200;

  //skeleton
  public skeleton:boolean = false;

  //public genres: Map<number, string> = new Map<number, string>();

  constructor(private movieDetailsService: MovieDetailsService, private route: ActivatedRoute, private destroy$: AutoDestroyService){}

  ngOnInit(): void {
    const moveIdString = this.route.snapshot.paramMap.get('id');
    this.movideId = +moveIdString!;

    this.movieDetailsService.movieDetailsById(this.movideId).subscribe((data)=> this.movieDetails = data);

    //Similar
    this.movieDetailsService.movieListSimilar(this.movideId).subscribe((data)=>this.similarMovies = data.results);

    //skeleton
    this.movieDetailsService.skeleton$.pipe(
      (takeUntil(this.destroy$)),
      startWith(this.skeleton),
      distinctUntilChanged(),

    )
    .subscribe(value => {
      this.skeleton = value;
    })


  }

  onShow() {
    this.showMore = !this.showMore;
  }

}
