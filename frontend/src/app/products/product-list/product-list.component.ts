import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap, distinctUntilChanged, startWith, share } from 'rxjs';

import { Product } from '../../model/product';
import { ProductSearchService } from '../../services/product-search.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  public products$: Observable<Product[]>;
  public searchString:string = '';

  constructor(private productSearchService:ProductSearchService, private productService:ProductService) {}

  ngOnInit():void {

    this.products$ = this.productSearchService.searchTerms$.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query:string) => this.productService.getProducts(query)),
      share()
    );
  }
}


