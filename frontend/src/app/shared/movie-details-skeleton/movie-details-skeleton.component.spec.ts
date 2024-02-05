import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsSkeletonComponent } from './movie-details-skeleton.component';

describe('MovieDetailsSkeletonComponent', () => {
  let component: MovieDetailsSkeletonComponent;
  let fixture: ComponentFixture<MovieDetailsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
