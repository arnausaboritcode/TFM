import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCarrouselComponent } from './genre-carrousel.component';

describe('GenreCarrouselComponent', () => {
  let component: GenreCarrouselComponent;
  let fixture: ComponentFixture<GenreCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreCarrouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
