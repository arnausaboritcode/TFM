import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private authToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public authToken$: Observable<string | null> = this.authToken.asObservable();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.authToken.next(storedToken);
        console.log('localStorage token recuperated');
        return;
      }
    }

    if (typeof sessionStorage !== 'undefined') {
      const storedTokenSession = sessionStorage.getItem('token');
      if (storedTokenSession) {
        this.authToken.next(storedTokenSession);
        console.log('sessionStorage token recuperated');
      }
    }
  }

  setToken(token: string, storage: Storage): void {
    this.authToken.next(token);
    storage.setItem('token', token);
  }

  getToken(): string | null {
    return this.authToken.value;
  }

  clearToken(): void {
    this.authToken.next(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.authToken.value != null;
  }
}
