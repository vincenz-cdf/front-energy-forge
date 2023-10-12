import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { CharacterEquipment } from '../homepage/dialogs/character-equipment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private axiosService: AxiosService, private modalService: NgbModal) { }

  listHabitsById() {
    return this.axiosService.request("GET", "/habits", {});
  }

  createHabit() {
    return this.axiosService.request("POST", "/habits", {});
  }

  updateHabit(habit: any) {
    return this.axiosService.request("POST", "/habits/" + habit.id, habit)
  }

  listCharactersByUserId() {
    return this.axiosService.request("GET", "/characters", {});
  }

  manageCharacterStuff(char: any) {
    const modalRef = this.modalService.open(CharacterEquipment, { size: 'xl' });
    modalRef.componentInstance.character = char;
  }

  listEquippedItemsByCharId(id: any) {
    return this.axiosService.request("GET", "/equippeditem/" + id, {});
  }
}
