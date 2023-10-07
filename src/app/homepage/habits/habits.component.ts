import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {

  constructor(private axiosService: AxiosService) {

  }

  habits: any = null;

  ngOnInit(): void {
    this.showHabits()
  }

  async showHabits(): Promise<void> {
    try {
        const response = await this.axiosService.request("GET", "/habits", {});
        if (response.data.status === 'success') {
          this.habits = response.data.data;
        }
    } catch (error) {
        // Handle errors
    }
}


  addHabit(): void {
    this.axiosService.request("POST", "/habits", {})
      .then(response => {
        if (response.data.status === 'success') {
          console.log(response.data.message); // Success message from server
          // Optionally, update UI or store state here to reflect the newly created habit
          this.showHabits()
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Error:', error.response.data.message); // Specific error message from server
        } else {
          console.error('An unknown error occurred while trying to create the habit.'); 
          // Generic error message for scenarios where no specific message is received
        }
      });
  }

  onCheckboxChange(habit: any) {
    habit.checked = !habit.checked;
    console.log(`Habit ID: ${habit.id}, Checked: ${habit.checked}`);
    // You might want to update the habit status on the server here
  }
  
}
