import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCarrouselCardComponent } from './genre-carrousel-card.component';

describe('GenreCarrouselCardComponent', () => {
  let component: GenreCarrouselCardComponent;
  let fixture: ComponentFixture<GenreCarrouselCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreCarrouselCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreCarrouselCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
