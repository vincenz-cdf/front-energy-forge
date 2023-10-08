import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private axiosService: AxiosService) { }

  handleProfileError(error: any): void {
    // Optionally: Add some user feedback here (like a toaster notification)
    console.error('Profile retrieval failed', error);
    this.axiosService.setAuthToken(null);
    // Ensure that the user is navigated to the 'welcome' page.
    window.location.reload();  // Force reload to ensure clean slate and apply route guards if any.
  }
}
