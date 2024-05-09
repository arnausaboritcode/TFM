import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../../routes/services/auth.service';
import { HeaderService } from '../../../../routes/services/header.service';
import { LocalStorageService } from '../../../../routes/services/local-storage.service';
import { NotificationService } from '../../../../routes/services/notification.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  showNav: boolean;
  showMenu: boolean;

  spinner: boolean;

  constructor(
    private headerService: HeaderService,
    private destroy$: AutoDestroyService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.showNav = true;
    this.showMenu = false;
    this.spinner = false;
  }

  ngOnInit(): void {
    //Show or hide navbar
    this.headerService.showNavbar$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.showNav = data;
      });

    //Hiding responsive menu on route change
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = false;
      }
    });
  }

  logout(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.localStorageService.clearToken();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.notificationService.showSuccess(
            `<p class="text-xs">Logged out succesfully</p>`
          );
          this.router.navigate(['/user/login']);
        },
      });

    //Spinner
    this.authService.spinner$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.spinner = value;
      });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }
}
