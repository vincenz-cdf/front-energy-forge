import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-combat-instance',
  templateUrl: './combat-instance.component.html',
  styleUrls: ['./combat-instance.component.css']
})
export class CombatInstanceComponent implements OnInit {

  @Input() scenario: any;
  @Input() levelName: string = "";

  combatInstance: any;

  npcCharacters: any;
  heroCharacters: any;

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadDataCombatInstance();
  }

  loadDataCombatInstance() {
    this.expeditionService.createOrRetrieveCombatInstance({ "string": this.scenario }).then((response) => {
      this.combatInstance = response.data.data;
      this.loadDataCharacters(response.data.data.id);

    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  loadCombatInstanceById() {
    this.expeditionService.getCombatInstanceById(this.combatInstance.id).then((response) => {
      this.combatInstance = response.data.data;

    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  loadDataCharacters(ciId: any) {
    this.expeditionService.listAllCharactersByCI(ciId).then((response) => {
      const all = response.data.data;
      this.heroCharacters = all.filter((char: any) => char.characterType == 'HERO');
      this.npcCharacters = all.filter((char: any) => char.characterType != 'HERO');
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }

  openListOfCharacters() {
    const modalRef = this.expeditionService.openListOfCharactersDialog(this.combatInstance);

    modalRef.result.then(
      (result) => {
        this.loadDataCombatInstance();
      },
      (reason) => {
      }
    );
  }

  close() {
    this.activeModal.close();
  }

  launchCombat() {
    this.expeditionService.launchCombatInstance(this.combatInstance.id).then(() => {
      this.loadCombatInstanceById();
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

  seeCombatResult() {
    this.errorService.notifyCombatResult(this.combatInstance);

    this.expeditionService.getCombatInstanceResult(this.combatInstance.id).then(() => {
      this.loadCombatInstanceById();
      this.profileService.notifyChildD();
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

  pickCharacter(charId: any) {
    this.expeditionService.pickCharacterForCombat(charId, this.combatInstance.id).then((response) => {
      this.loadDataCombatInstance();
    }, (error) => {
      this.errorService.handleError(error);
    });
  }
}
