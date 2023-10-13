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
    allArmors: any;
    allWeapons: any;

    armorUiPath = "assets/sprites/ui/armor.png"
    attackUiPath = "assets/sprites/ui/damage.png"
    coinPath = "assets/sprites/ui/coin.png"
  
    constructor(private activeModal: NgbActiveModal, private equipmentService: EquipmentService, private errorService: ErrorService) {}

    ngOnInit(): void {
      this.initializeEquipments();
    }

    initializeEquipments() {
      this.equipmentService.listAllArmors().then((response) => {
        this.allArmors = response.data.data
      }, (error) => {
        this.errorService.handleError(error);
      });

      this.equipmentService.listAllWeapons().then((response) => {
        this.allWeapons = response.data.data
      }, (error) => {
        this.errorService.handleError(error);
      });
    }



    equipEquipment(gearId: any) {

      if(!this.isItemEquipped(gearId)) {
        this.equipmentService.equipGear(gearId, this.character.id).then((response) => {
          console.log(response.data.data)
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
      if(this.character.equippedItems.findIndex((element: any) => element.equipmentId == currentItemId) != -1) {
        return true
      }
      return false;
    }

    isItemEquippedBySlot(array: any, slot: string) {
      return array.findIndex((element: any) => element.slot === slot) != -1;
    }

    save() {
      this.activeModal.close();
    }
}