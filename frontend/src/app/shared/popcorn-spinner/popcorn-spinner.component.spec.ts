import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopcornSpinnerComponent } from './popcorn-spinner.component';

describe('PopcornSpinnerComponent', () => {
  let component: PopcornSpinnerComponent;
  let fixture: ComponentFixture<PopcornSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopcornSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopcornSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
