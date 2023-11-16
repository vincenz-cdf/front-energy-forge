import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { CharacterEquipment } from '../homepage/dialogs/character-equipment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericInputComponent } from '../homepage/auth-content/dialogs/generic-input/generic-input.component';
import { StripeDiamondComponent } from '../homepage/auth-content/stripe-diamond/stripe-diamond.component';

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

  listWoundedChars() {
    return this.axiosService.request("GET", "/characters/wounded", {});
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

  healCharacterFromTemple(charId: any) {
    return this.axiosService.request("PUT", "/characters/" + charId + "/heal", {});
  }

  dringCharacterFromTavern(charId: any) {
    return this.axiosService.request("PUT", "/characters/" + charId + "/drink", {});
  }

  setCharacterForRecovering(id: any, charId: any) {
    return this.axiosService.request("PUT", "/characters/" + charId + "/consume/" + id, {});
  }

  listAllBuildings() {
    return this.axiosService.request("GET", "/buildings", {});
  }

  buyItem(id: any, type: any) {
    return this.axiosService.request("POST", "/buy/" + id + "/" + type , {});
  }

  genericDialog(title: any) {
    const modalRef = this.modalService.open(GenericInputComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.title = title;

    return modalRef;
  }

  renameCharacter(id: any, name: any) {
    return this.axiosService.request("PUT", "/characters/" + id + "/rename/" + name , {});
  }

  manageBuyDiamondDialog() {
    const modalRef = this.modalService.open(StripeDiamondComponent, { size: 'md', backdrop: 'static' });

    return modalRef;
  }
}
