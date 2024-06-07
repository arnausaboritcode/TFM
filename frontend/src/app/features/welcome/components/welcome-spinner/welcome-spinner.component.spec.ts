import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSpinnerComponent } from './welcome-spinner.component';

describe('WelcomeSpinnerComponent', () => {
  let component: WelcomeSpinnerComponent;
  let fixture: ComponentFixture<WelcomeSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
