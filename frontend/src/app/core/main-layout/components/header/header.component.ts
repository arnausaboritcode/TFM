import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs';
import { AuthService } from '../../../../routes/services/auth.service';
import { HeaderService } from '../../../../routes/services/header.service';
import { LocalStorageService } from '../../../../routes/services/local-storage.service';
import { UserService } from '../../../../routes/services/user.service';
import { UserDataDTO } from '../../../models/user-data.dto';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  showNav: boolean;

  userData: UserDataDTO;
  userNameLetter: string;

  spinner: boolean;

  showMenu: boolean;

  constructor(
    private headerService: HeaderService,
    private destroy$: AutoDestroyService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userData = new UserDataDTO(0, '', '', null, '', '');
    this.userNameLetter = '';
    this.showNav = true;
    this.spinner = false;
    this.showMenu = false;
  }

  ngOnInit(): void {
    //Show/Hide full navbar
    this.headerService.showNavbar$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.showNav = data;
      });

    //Full user data
    this.localStorageService.authToken$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userService
          .getUserInfo()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (userData: UserDataDTO) => {
              this.userData.name = userData.name;
              this.userData.email = userData.email.replace(
                /(.)(.*)(?=@)/,
                (match: string, firstChar: string, middleChars: string) => {
                  const asterisks = middleChars.replace(/./g, '*');
                  return firstChar + asterisks;
                }
              );
              this.userNameLetter = this.userData.name.charAt(0);
            },
            error: (error) => {
              console.error(error);
            },
          });
      });

    //Spinner
    this.userService.spinner$
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.spinner),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.spinner = value;
      });

    //Detect route change for hiding responsive menu on change route
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = false;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.localStorageService.clearToken();
        this.router.navigate(['/user/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  toggleNavbar(): void {
    this.showMenu = !this.showMenu;
  }
}
