import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchCardComponent } from './movie-search-card.component';

describe('MovieSearchCardComponent', () => {
  let component: MovieSearchCardComponent;
  let fixture: ComponentFixture<MovieSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSearchCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
