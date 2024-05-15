import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListsSkeletonComponent } from './movie-lists-skeleton.component';

describe('MovieListsSkeletonComponent', () => {
  let component: MovieListsSkeletonComponent;
  let fixture: ComponentFixture<MovieListsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieListsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
