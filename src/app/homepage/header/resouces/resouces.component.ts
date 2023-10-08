import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-resouces',
  templateUrl: './resouces.component.html',
  styleUrls: ['./resouces.component.css']
})
export class ResoucesComponent implements OnInit, OnDestroy {

  data: any;
  private subscription: Subscription;

  constructor(private profileService: ProfileService, private errorService: ErrorService) {
    this.subscription = this.profileService.notifyD$.subscribe(() => {
      this.fetchProfile();
    });
   }


  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.profileService.getUserInfo().then((response) => {
      this.data = response.data;
    }, (error) => {
      this.errorService.handleProfileError(error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Always unsubscribe to prevent memory leaks!
  }

}
