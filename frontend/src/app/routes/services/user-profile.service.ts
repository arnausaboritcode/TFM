import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserStoreService } from './user-store.service';



@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient, private userStoreService:UserStoreService) { }

  getUserInfo(){
    const headers = {
      'Authorization': 'Bearer ' + this.userStoreService.getToken(),
    };

    return this.http.get(`${environment.api_url}/auth/user`, {headers, withCredentials: true });

  }
}
