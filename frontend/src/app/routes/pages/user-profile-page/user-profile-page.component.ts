import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment.development';
import { UserStoreService } from '../../services/user-store.service';
import { UserProfileService } from '../../services/user-profile.service';



@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit {

  public userName:string;
  public userNameLetter:string;
  public userEmail:string;
  public userCreatedDate:number;

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.userName = this.route.snapshot.data['userProfileData'].name;
    this.userEmail = this.route.snapshot.data['userProfileData'].email;
    this.userCreatedDate = this.route.snapshot.data['userProfileData'].created_at;

    this.userNameLetter = this.userName.charAt(0);

    }

}
