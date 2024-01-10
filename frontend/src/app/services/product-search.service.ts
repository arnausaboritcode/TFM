import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  private searchTerms:BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerms$: Observable<string> = this.searchTerms.asObservable();

  constructor(private http: HttpClient) { }

  onSearch(searchString:string):void {
    this.searchTerms.next(searchString);
  }
}
