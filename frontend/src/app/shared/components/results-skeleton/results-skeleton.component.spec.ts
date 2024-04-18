import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSkeletonComponent } from './results-skeleton.component';

describe('ResultsSkeletonComponent', () => {
  let component: ResultsSkeletonComponent;
  let fixture: ComponentFixture<ResultsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
