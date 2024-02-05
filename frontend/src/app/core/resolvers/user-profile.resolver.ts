import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileService } from '../../routes/services/user-profile.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class userProfileResolver implements Resolve<Observable<any>> {
  constructor(private userProfileService: UserProfileService){}

  resolve():Observable<any> {
    return this.userProfileService.getUserInfo();
  }
}
