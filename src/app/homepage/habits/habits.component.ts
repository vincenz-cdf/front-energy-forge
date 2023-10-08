import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fadeInOutTranslateXAnimation } from 'src/app/animations/fadeInOutTranslateXAnimation';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css'],
  animations: [
    fadeInOutTranslateXAnimation
  ]
})
export class HabitsComponent implements OnInit {

  @Output() onHabitChangeEvent = new EventEmitter();

  constructor(private playerService: PlayerService, private profileService: ProfileService) {

  }

  habits: any = null;

  showImage = false;

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

  updateHabit(habit: any, changes: any) {
    // Apply changes directly to habit object
    Object.assign(habit, changes);

    this.playerService.updateHabit(habit).then((response) => {
      if (response.data.status === 'success') {
        this.showHabits();
      }

      if (changes.title !== undefined) {
        habit.editMode = false;
      }

      this.profileService.notifyChildD();
      this.energyAnimation();
    }, (error) => {
      // Handle error accordingly...
      console.error(error);
    });
  }

  enableEditMode(habit: any) {
    habit.editMode = true;
  }

  energyAnimation() {
    this.showImage = true;
    setTimeout(() => this.showImage = false, 1500);
  }

}