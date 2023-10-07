import { Component } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {

  constructor(private axiosService: AxiosService) {

  }

  addHabit(): void {
    this.axiosService.request("POST", "/habits", {})
      .then(response => {
        console.log('Habits fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching habits:', error);
      });
  }
}
