import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genreTitleResolver } from './genre-title.resolver';

describe('genreTitleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => genreTitleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
