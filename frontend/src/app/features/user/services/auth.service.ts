import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthDTO } from '../../../core/models/auth.dto';
import { LocalStorageService } from '../../../core/services/common/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  //spinner
  private spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public spinner$: Observable<boolean> = this.spinner.asObservable();

  login(auth: AuthDTO): Observable<AuthDTO> {
    this.spinner.next(true);
    return this.http
      .post<AuthDTO>(`${environment.BASE_API_URL_BACKEND}/auth/login`, auth)
      .pipe(
        delay(3000),
        finalize(() => this.spinner.next(false))
      );
  }

  logout() {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    this.spinner.next(true);
    return this.http
      .post(
        `${environment.BASE_API_URL_BACKEND}/auth/logout`,
        {},
        { headers, withCredentials: true }
      )
      .pipe(
        delay(3000),
        finalize(() => this.spinner.next(false))
      );
  }
}
