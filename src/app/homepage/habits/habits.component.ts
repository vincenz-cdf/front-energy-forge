import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
import { PlayerService } from 'src/app/dbservice/player.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {

  constructor(private axiosService: AxiosService, private playerService: PlayerService) {

  }

  habits: any = null;

  ngOnInit(): void {
    this.showHabits()
  }

  showHabits() {
    this.playerService.listHabitsById().then((response) => {
      if (response.data.status === 'success') {
        this.habits = response.data.data;
      }
    }, (error) => {
      //SweetAlert
    })

  }


  addHabit() {
    this.playerService.createHabit().then((response) => {
      if (response.data.status === 'success') {
        console.log(response.data.message); // Success message from server
        // Optionally, update UI or store state here to reflect the newly created habit
        this.showHabits()
      }
    }, (error) => {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.message); // Specific error message from server
      } else {
        console.error('An unknown error occurred while trying to create the habit.');
        // Generic error message for scenarios where no specific message is received
      }
    })

  }

  updateHabit(habit: any, check: boolean) {

    if(check) {
      habit.checked = true;
    } else {

    }

    this.playerService.updateHabit(habit).then((response) => {
      if (response.data.status === 'success') {
        this.showHabits();
      }
    }, (error) => {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.message); // Specific error message from server
      } else {
        console.error('An unknown error occurred while trying to create the habit.');
        // Generic error message for scenarios where no specific message is received
      }
    });
  }

}