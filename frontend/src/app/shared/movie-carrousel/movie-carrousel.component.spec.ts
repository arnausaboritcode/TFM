import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarrouselComponent } from './movie-carrousel.component';

describe('MovieListComponent', () => {
  let component: MovieCarrouselComponent;
  let fixture: ComponentFixture<MovieCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
