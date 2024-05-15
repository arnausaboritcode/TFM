import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailSkeletonComponent } from './movie-detail-skeleton.component';

describe('MovieDetailSkeletonComponent', () => {
  let component: MovieDetailSkeletonComponent;
  let fixture: ComponentFixture<MovieDetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
