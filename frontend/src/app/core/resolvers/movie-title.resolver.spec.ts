import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieTitleResolver } from './movie-title.resolver';

describe('movieTitleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieTitleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
