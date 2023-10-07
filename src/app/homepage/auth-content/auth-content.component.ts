import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: any;

  constructor(private axiosService: AxiosService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.axiosService.request(
      "GET",
      "/profile/" + this.profileService.getUserInfo(),
      {}
    ).then(
      (response) => {
        this.data = response.data;
      }
    ).catch(
      (error) => {
        this.handleProfileError(error);
      }
    );
  }

  handleProfileError(error: any): void {
    // Optionally: Add some user feedback here (like a toaster notification)
    console.error('Profile retrieval failed', error);
    this.axiosService.setAuthToken(null);
    // Ensure that the user is navigated to the 'welcome' page.
    window.location.reload();  // Force reload to ensure clean slate and apply route guards if any.
  }
}