import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CombatInstanceComponent } from '../homepage/auth-content/expedition/dialogs/combat-instance/combat-instance.component';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  constructor(private axiosService: AxiosService, private modalService: NgbModal) {}

  combatInstanceDialog(scenario: string) {
    const modalRef = this.modalService.open(CombatInstanceComponent, { size: 'xl' });
    modalRef.componentInstance.scenario = scenario;

    return modalRef;
  }

  createOrRetrieveCombatInstance(scenario: any) {
    return this.axiosService.request("POST", "/combatinstance", scenario);
  }

  listAllCharactersByCI(ciId: any) {
    return this.axiosService.request("GET", "/combatinstance/" + ciId + "/characters", {});
  }
}
