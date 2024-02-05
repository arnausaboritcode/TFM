import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListSkeletonComponent } from './search-list-skeleton.component';

describe('SearchListSkeletonComponent', () => {
  let component: SearchListSkeletonComponent;
  let fixture: ComponentFixture<SearchListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchListSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
