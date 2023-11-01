import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private axiosService: AxiosService) { }

  //TODO list equipment from user inventory
  listAllArmors() {
    return this.axiosService.request("GET", "/armors", {});
  }
  listAllWeapons() {
    return this.axiosService.request("GET", "/weapons", {});
  }
  listAllConsumables() {
    return this.axiosService.request("GET", "/consumables", {});
  }

  equipGear(gearId: any, charId: any) {
    return this.axiosService.request("POST", "/equipments/" + charId, gearId);
  }

  unequipAll(charId: any) {
    return this.axiosService.request("DELETE", "equipments/character/" + charId, {});
  }
}
