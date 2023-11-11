import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
import { EquipmentService } from 'src/app/dbservice/equipment.service';
import { PlayerService } from 'src/app/dbservice/player.service';
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

  consumables: any;

  displayedItems: any;

  uiPaths = UIPATHS;

  constructor(
    private activeModal: NgbActiveModal,
    private equipmentService: EquipmentService,
    private errorService: ErrorService,
    private playerService: PlayerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.displayedItems = "E";
    this.initializeEquipments();
    this.initializeConsumables();
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

  initializeConsumables() {
    this.equipmentService.listAllConsumables().then((response) => {
      this.consumables = response.data.data;
    }, (error) => {
      this.errorService.handleError(error);
    })
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
    for (let char of otherChars) {
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

  switchDisplayingItems(type: string) {
    this.displayedItems = type;
  }

  roundCeil(long: any) {
    return Math.ceil(long);
  }

  consumeConsumable(id: any) {
    this.playerService.setCharacterForRecovering(id, this.character.id).then((response) => {
      this.character = response.data.data;
      this.initializeEquipments();
      this.initializeConsumables();
    }, (error) => {
      this.toastr.error(error.response.data.message, 'Forbidden action');
    });
  }

  save() {
    this.activeModal.close();
  }

  getProgress(char: any): number {
    return (char.experiencePoint / (char.level * 1000)) * 100;
  }
  
}