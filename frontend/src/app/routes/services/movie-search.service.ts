import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, delay } from 'rxjs';

import { SearchResult } from '../../core/models/movie';
import { environment } from '../../../environments/environment.development';
import { SearchFilters } from '../../core/models/search-filters';


@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {

  private searchTerms:BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerms$:Observable<string> = this.searchTerms.asObservable();
  //Skeleton
  private skeleton:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public skeleton$:Observable<boolean> = this.skeleton.asObservable();

  constructor(private httpClient: HttpClient) { }

  searchMovie(filters?:SearchFilters, nextUrl?:string):Observable<SearchResult> {
    //Infinite scroll
    if(nextUrl){
      //this.skeleton.next(true);
      return this.httpClient.get<SearchResult>(nextUrl);
        //Dona problemes i no es perceb lskeleton al infinite scroll delay(500),
        //finalize(() => this.skeleton.next(false))
    }
    //
    //skeleton
    if (filters && filters.query && filters.query.trim() !== ''){
      this.skeleton.next(true);
    }
    const params = new HttpParams({
      fromObject: { ...filters }
    })
    return this.httpClient.get<SearchResult>(`${environment.BASE_API_URL}search/movie?${params}`)
    .pipe(
      delay(500),
      finalize(() => this.skeleton.next(false))
    );
  }

  setQueryString(query:string){
    this.searchTerms.next(query);
  }


}

