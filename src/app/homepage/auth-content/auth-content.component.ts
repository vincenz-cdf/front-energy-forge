import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { ProfileService } from '../../profile.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: any;

  constructor(private profileService: ProfileService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getUserInfo().then((response) => {
      this.data = response.data;
    }, (error) => {
      this.errorService.handleProfileError(error);
    });
  }

}
