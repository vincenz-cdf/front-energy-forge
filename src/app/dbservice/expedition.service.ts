import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CombatInstanceComponent } from '../homepage/auth-content/expedition/dialogs/combat-instance/combat-instance.component';
import { CharacterCombatSelectComponent } from '../homepage/auth-content/expedition/dialogs/character-combat-select/character-combat-select.component';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  constructor(private axiosService: AxiosService, private modalService: NgbModal) {}

  combatInstanceDialog(scenario: string, levelName: string) {
    const modalRef = this.modalService.open(CombatInstanceComponent, { size: 'lg' });
    modalRef.componentInstance.scenario = scenario;
    modalRef.componentInstance.levelName = levelName;

    return modalRef;
  }

  createOrRetrieveCombatInstance(scenario: any) {
    return this.axiosService.request("POST", "/combatinstance", scenario);
  }

  listAllCharactersByCI(ciId: any) {
    return this.axiosService.request("GET", "/combatinstance/" + ciId + "/characters", {});
  }

  openListOfCharactersDialog(ciId: any) {
    const modalRef = this.modalService.open(CharacterCombatSelectComponent, { size: 'md' });
    modalRef.componentInstance.ciId = ciId;

    return modalRef;
  }

  listAllCharactersByUserId() {
    return this.axiosService.request("GET", "/combatinstance/currentCharacters", {});
  }

  pickCharacterForCombat(charId: any, ciId: any) {
    return this.axiosService.request("PUT", "/combatinstance/" + ciId + "/character/" + charId, {});
  }
}
