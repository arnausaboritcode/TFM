import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserDataDTO } from '../../core/models/user-data.dto';
import { UserDTO } from '../../core/models/user.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //spinner
  private spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  spinner$: Observable<boolean> = this.spinner.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  register(user: UserDTO): Observable<UserDTO> {
    this.spinner.next(true);
    return this.http
      .post<UserDTO>(`${environment.api_url}/auth/register`, user)
      .pipe(
        delay(2000),
        finalize(() => this.spinner.next(false))
      );
  }

  updateUser(updatedUserData: UserDTO): Observable<UserDTO> {
    this.spinner.next(true);
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    return this.http
      .put<UserDTO>(`${environment.api_url}/auth/update`, updatedUserData, {
        headers,
        withCredentials: true,
      })
      .pipe(
        delay(2000),
        finalize(() => this.spinner.next(false))
      );
  }

  getUserInfo(): Observable<UserDataDTO> {
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    return this.http.get<UserDataDTO>(`${environment.api_url}/auth/user`, {
      headers,
      withCredentials: true,
    });
  }

  getAllUsersInfo(): Observable<any> {
    this.spinner.next(true);
    const headers = {
      Authorization: 'Bearer ' + this.localStorageService.getToken(),
    };
    return this.http
      .get<UserDataDTO>(`${environment.api_url}/auth/users`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        /* delay(2000), */
        finalize(() => this.spinner.next(false))
      );
  }
}
