import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteLibraryComponent } from './favorite-library.component';

describe('FavoriteLibraryComponent', () => {
  let component: FavoriteLibraryComponent;
  let fixture: ComponentFixture<FavoriteLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
