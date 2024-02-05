import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarShowHideService {

  public showNavbar: BehaviorSubject<boolean>= new BehaviorSubject(true);
  public showNavbar$:Observable<boolean> = this.showNavbar.asObservable();

  constructor() {

   }

  show():void {
    this.showNavbar.next(true);
  }

  hide():void {
    this.showNavbar.next(false);
  }
}
