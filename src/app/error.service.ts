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

  notifyError(error: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Erreur',
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  notifyBinaryChoice(title: any) {
    return Swal.fire({
      title: title,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    })
  }

  notifyCombatResult(combatInstance: any) {
    if (combatInstance.status == "WON_FINAL") {
      return Swal.fire({
        icon: 'info',
        title: 'Victory',
        html: `
        ${combatInstance.combatReward.coins}
        <img src="../assets/sprites/ui/coin.png" alt="gold" width="20"> 
        ${combatInstance.combatReward.experiencePoints} xp
      `,
        showConfirmButton: true,
      });
    } else {
      return Swal.fire({
        icon: 'info',
        title: 'Defeat',
        text: 'All equipped items have been lost and your heroes needs to be healed back at the Temple',
        showConfirmButton: true,
      });
    }
  }

  notifyNewEquipment(spritePath: any) {
    return Swal.fire({
      icon: 'info',
      title: 'New item obtained !',
      html: `
        <img src="${spritePath}" alt="equipment"> 
      `,
      showConfirmButton: true,
    });
  }

}
