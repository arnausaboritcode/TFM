import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private authToken: string | null = null;

  constructor() {
    if (typeof localStorage !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.authToken = storedToken;
      console.log('token recuperated');
    }
    }
  }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.authToken;
  }

  clearToken(): void {
    this.authToken = null;
    localStorage.removeItem('token');
  }

  isLoggedIn():boolean {
    return this.authToken != null;
  }
}

