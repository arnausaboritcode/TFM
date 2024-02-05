import { TestBed } from '@angular/core/testing';

import { NavbarShowHideService } from './navbar-show-hide.service';

describe('NavbarShowHideService', () => {
  let service: NavbarShowHideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarShowHideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
