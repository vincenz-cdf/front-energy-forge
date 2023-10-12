import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/dbservice/equipment.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-character_equipment',
  templateUrl: './character-equipment.component.html',
})
export class CharacterEquipment implements OnInit {
    @Input() character: any;
    allEquipments: any;
  
    constructor(private activeModal: NgbActiveModal, private equipmentService: EquipmentService, private errorService: ErrorService) {}

    ngOnInit(): void {
      this.initializeEquipments();
    }

    initializeEquipments() {
      this.equipmentService.listAllEquipment().then((response) => {
        this.allEquipments = response.data.data
      }, (error) => {
        this.errorService.handleError(error);
      });
    }



    equipEquipment(gearId: any) {
      this.equipmentService.equipGear(gearId, this.character.id).then((response) => {
        const newEquippedItem = response.data.data
        const oldItemIndex = this.character.equippedItems.findIndex((element: any) => element.id === newEquippedItem.id);
        if(oldItemIndex != -1) {
          this.character.equippedItems[oldItemIndex] = newEquippedItem;
        } else {
          this.character.equippedItems.push(response.data.data)
        }
      }, (error) => {
        this.errorService.handleError(error);
      });
    }

    splitEquipmentSlots(array: any, slot: string) {
      return array.find((element: any) => element.slot === slot);
    }

    isItemEquipped(currentItemId: any) {
      if(this.character.equippedItems.findIndex((element: any) => element.equipmentId == currentItemId) != -1) {
        return true
      }
      return false;
    }

    save() {
      this.activeModal.close();
    }
}