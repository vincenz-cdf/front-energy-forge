import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ProfileService } from 'src/app/profile.service';

import { AnimationEvent } from '@angular/animations';

import { bounceFadeOutAnimation } from 'src/app/animations/bounceFadeOutAnimation';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css'],
  animations: [bounceFadeOutAnimation
  ]
})
export class HabitsComponent implements OnInit {

  @Output() onHabitChangeEvent = new EventEmitter();

  constructor(private playerService: PlayerService, private profileService: ProfileService, private errorService: ErrorService) {

  }

  habits: any = null;

  showImage = false;

  ngOnInit(): void {
    this.showHabits()
  }

  showHabits() {
    this.playerService.listHabitsById().then((response) => {
      if (response.data.status === 'success') {
        this.habits = response.data.data.map((habit: any) => ({ ...habit, showImage: false }));
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
    }})
  }
  

  updateHabit(habit: any, changes: any, habitIndex: number) {
    // Apply changes directly to habit object
    Object.assign(habit, changes);

    this.playerService.updateHabit(habit).then((response) => {

      if (response.data.status === 'success' && changes.checked !== true) {
        this.showHabits();

      }

      if (changes.title !== undefined) {
        habit.editMode = false;
      }

      this.profileService.notifyChildD();
      this.startAnimation(habitIndex);
    }, (error) => {
      // Handle error accordingly...
      console.error(error);
    });
  }

  enableEditMode(habit: any) {
    habit.editMode = true;
  }

  startAnimation(habitIndex: number) {
    this.habits[habitIndex].showImage = true;
    setTimeout(() => {
      this.habits[habitIndex].showImage = false;
    }, 2000);
  }

  animationStart(event: AnimationEvent) {
    console.log('Animation Start', event);
  }

  animationDone(event: AnimationEvent) {
    console.log('Animation Done', event);
  }

}