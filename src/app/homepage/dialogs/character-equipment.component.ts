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
  
    constructor(public activeModal: NgbActiveModal, private equipmentService: EquipmentService, private errorService: ErrorService) {}

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
      this.equipmentService.equipGear(gearId, this.character.id);
    }
}