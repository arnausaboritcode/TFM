import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSkeletonComponent } from './welcome-skeleton.component';

describe('WelcomeSkeletonComponent', () => {
  let component: WelcomeSkeletonComponent;
  let fixture: ComponentFixture<WelcomeSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
