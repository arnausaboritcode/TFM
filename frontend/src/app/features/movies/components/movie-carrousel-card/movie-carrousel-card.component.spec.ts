import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarrouselCardComponent } from './movie-carrousel-card.component';

describe('MovieCarrouselCardComponent', () => {
  let component: MovieCarrouselCardComponent;
  let fixture: ComponentFixture<MovieCarrouselCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCarrouselCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCarrouselCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
