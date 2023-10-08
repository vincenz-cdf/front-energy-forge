import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private axiosService: AxiosService) { }

  listHabitsById() {
    return this.axiosService.request("GET", "/habits", {});
  }

  createHabit() {
    return this.axiosService.request("POST", "/habits", {});
  }

  updateHabit(habit: any) {
    return this.axiosService.request("POST", "/habits/" + habit.id, habit)
  }
}
