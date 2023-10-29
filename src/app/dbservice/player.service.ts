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

  list3CharactersByUserId() {
    return this.axiosService.request("GET", "/characters", {});
  }

  manageCharacterStuff(char: any, characters: any) {
    const modalRef = this.modalService.open(CharacterEquipment, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.character = char;
    modalRef.componentInstance.characters = characters;

    return modalRef;
  }

  listEquippedItemsByCharId(id: any) {
    return this.axiosService.request("GET", "/equippeditem/" + id, {});
  }

  deleteHabit(habitId: any) {
    return this.axiosService.request("DELETE", "/habits/" + habitId, {});
  }
}
