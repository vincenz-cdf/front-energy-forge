import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private axiosService: AxiosService) { }

  //TODO list equipment from user inventory
  listAllEquipment() {
    return this.axiosService.request("GET", "/equipments", {});
  }

  equipGear(gearId: any, charId: any) {
    return this.axiosService.request("POST", "/equipments/" + charId, gearId);
  }
}
