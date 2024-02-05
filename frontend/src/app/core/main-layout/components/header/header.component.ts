import { Component, OnInit } from '@angular/core';
import { NavbarShowHideService } from '../../../../routes/services/navbar-show-hide.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { UserStoreService } from '../../../../routes/services/user-store.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public showNav:boolean;

  constructor(private navbarService: NavbarShowHideService, private destroy$: AutoDestroyService, private http:HttpClient, private router: Router, private userStoreService:UserStoreService){}

  ngOnInit(): void {
    this.navbarService.showNavbar$.pipe(takeUntil(this.destroy$)).subscribe((data)=> {
      this.showNav = data;
    })

  }

  logout(){
    const headers = {
      'Authorization': 'Bearer ' + this.userStoreService.getToken(),
  };

    this.http.post(`${environment.api_url}/auth/logout`,{}, {headers, withCredentials: true })
    .subscribe({
      next: (response: any) => {
          console.log(response.message);
          this.userStoreService.clearToken();
          this.router.navigate(['/login']);
      },
      error: (error) => {
          console.error(error);
      }
  });
  }

}
