import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, of, takeUntil } from 'rxjs';
import { UserService } from '../../features/user/services/user.service';
import { UserDataDTO } from '../models/user-data.dto';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class userDataResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: UserService,
    private destroy$: AutoDestroyService
  ) {}

  resolve(): Observable<UserDataDTO | string> {
    return this.userService.getUserInfo().pipe(
      takeUntil(this.destroy$),
      catchError(() => {
        return of('User data not available');
      })
    );
  }
}
