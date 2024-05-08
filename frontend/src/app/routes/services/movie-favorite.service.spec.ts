import { TestBed } from '@angular/core/testing';

import { MovieFavoriteService } from './movie-favorite.service';

describe('MovieFavoriteService', () => {
  let service: MovieFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
