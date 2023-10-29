import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/dbservice/equipment.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-character_equipment',
  templateUrl: './character-equipment.component.html',
  styleUrls: ['./character-equipment.component.css']
})
export class CharacterEquipment implements OnInit {
  @Input() character: any;
  @Input() characters: any;

  headArmors: any;
  bodyArmors: any;
  weapons: any;
  shields: any

  hpUiPath = "assets/sprites/ui/heart.png"
  armorUiPath = "assets/sprites/ui/armor.png"
  attackUiPath = "assets/sprites/ui/damage.png"
  coinPath = "assets/sprites/ui/coin.png"
  moodHighUiPath = "assets/sprites/ui/mood2.png"
  moodMidUiPath = "assets/sprites/ui/mood1.png"
  moodLowUiPath = "assets/sprites/ui/mood0.png"

  constructor(private activeModal: NgbActiveModal, private equipmentService: EquipmentService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.initializeEquipments();
  }

  initializeEquipments() {
    this.equipmentService.listAllArmors().then((response) => {
      const all = response.data.data
      this.headArmors = all.filter((armor: any) => armor.equipment.slot == 'HEAD');
      this.bodyArmors = all.filter((armor: any) => armor.equipment.slot == 'BODY');

    }, (error) => {
      this.errorService.handleError(error);
    });

    this.equipmentService.listAllWeapons().then((response) => {
      const all = response.data.data;
      this.weapons = all.filter((weapon: any) => weapon.equipment.slot == 'LEFTHAND' || weapon.equipment.slot == 'ZWEIHAND');
      this.shields = all.filter((weapon: any) => weapon.equipment.slot == 'RIGHTHAND');
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  equipEquipment(gearId: any) {
    if (!this.isItemEquipped(gearId)) {
      this.equipmentService.equipGear(gearId, this.character.id).then((response) => {
        this.character = response.data.data;
      }, (error) => {
        this.errorService.handleError(error);
      });
    }
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquipped(currentItemId: any) {
    if (this.character.equippedItems.findIndex((element: any) => element.equipmentId == currentItemId) != -1) {
      return true;
    }

    return false;
  }

  isItemEquippedByAnother(currentItemId: any) {
    const otherChars = this.characters.filter((char: any) => char.id != this.character.id);
    for(let char of otherChars) {
      if (char.equippedItems.findIndex((element: any) => element.equipmentId == currentItemId) != -1) {
        return true;
      }
    }
    return false;
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }

  unequipCharacter() {
    this.equipmentService.unequipAll(this.character.id).then((response) => {
      this.character = response.data.data;
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

  save() {
    this.activeModal.close();
  }
}