import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AxiosService } from 'src/app/axios.service';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
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
  public uiPaths = UIPATHS;

  constructor(private profileService: ProfileService, private errorService: ErrorService, private axiosService: AxiosService) {
    this.subscription = this.profileService.notifyD$.subscribe(() => {
      this.fetchProfile();
    });
   }


  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    if(this.axiosService.getAuthToken() !== null) {
      this.profileService.getUserInfo().then((response) => {
        this.data = response.data;
      }, (error) => {
        this.errorService.handleProfileError(error);
      });
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Always unsubscribe to prevent memory leaks!
  }

}
