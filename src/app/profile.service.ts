import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private axiosService: AxiosService) { }

  private notifyD = new Subject<void>();
  notifyD$ = this.notifyD.asObservable();

  notifyChildD() {
    this.notifyD.next();
  }

  setUserId(user: any) {
    if (user == null) {
      window.localStorage.setItem('userId', JSON.stringify(null));
    } else {
      window.localStorage.setItem('userId', JSON.stringify(user.id));
    }

  }

  getUserId() {
    const userInfo = window.localStorage.getItem('userId');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getUserInfo() {
    return this.axiosService.request(
      "GET",
      "/profile/" + this.getUserId(),
      {}
    );
  }


}
