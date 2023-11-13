import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private axiosService: AxiosService,
    private toastr: ToastrService
    ) { }

  handleProfileError(error: any): void {
    this.toastr.error(error.response.data.message, 'Profile Error')
    this.axiosService.setAuthToken(null);
    // Ensure that the user is navigated to the 'welcome' page.
    window.location.reload();  // Force reload to ensure clean slate and apply route guards if any.
  }

  handleError(error: any) {
    if (error.response && error.response.data) {
      this.toastr.error(error.response.data.message, 'Error')
    } else {
      this.toastr.error(error.response.data.message, 'An Unknown Error Has Occured')
    }
  }

  notifyError(error: any) {
    this.toastr.error(error.message, 'Error')
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
        ${combatInstance.combatReward.diamonds}
        <img src="../assets/sprites/ui/diamond.png" alt="diamond" width="20"> 
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

  notifyNewItem(spritePath: any, count: number = 1) {
    return Swal.fire({
        icon: 'info',
        title: count > 1 ? `New items obtained (x${count})!` : 'New item obtained!',
        html: `
            <img src="${spritePath}" alt="equipment">
        `,
        showConfirmButton: true,
    });
}

}
