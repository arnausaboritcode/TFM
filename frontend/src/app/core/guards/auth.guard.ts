import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../../routes/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    if (this.localStorageService.isLoggedIn()) {
      console.log('AuthGuard#canActivate authorized to access page');
      return true;
    } else {
      console.log('AuthGuard#canActivate not authorized to access page');
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
