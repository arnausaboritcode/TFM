import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { Input } from '@angular/core';

import { ProductSearchService } from '../../services/product-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public authPage:boolean;
  public searchString:string="";

  public showMenu:boolean = false;
  public showSearch = false;

  constructor(private router:Router, private productSearchService:ProductSearchService) {
    this.router.events.subscribe((url:any) => {
      if (url instanceof NavigationEnd) {
        if (this.router.routerState.snapshot.url === "/login" || this.router.routerState.snapshot.url === "/register" ) {
          this.authPage = true;
        } else {
          this.authPage = false;
        }
        this.showMenu = false;
      }
    });
  }

  search() {
    this.productSearchService.onSearch(this.searchString);
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }


}
