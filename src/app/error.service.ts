import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private axiosService: AxiosService) { }

  handleProfileError(error: any): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Profile Error',
      text: error,
      showConfirmButton: false,
      timer: 1500,
      backdrop: false
    });
    this.axiosService.setAuthToken(null);
    // Ensure that the user is navigated to the 'welcome' page.
    window.location.reload();  // Force reload to ensure clean slate and apply route guards if any.
  }

  handleError(error: any) {
    if (error.response && error.response.data) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erreur',
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erreur',
        text: "An unknown error occurred.",
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
      });
    }
  }

  notifyError(text: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Erreur',
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  
}
