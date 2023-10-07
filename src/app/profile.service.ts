import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  setUserInfo(user: any) {
    window.localStorage.setItem('userId', JSON.stringify(user.id));
  }

  getUserInfo() {
    const userInfo = window.localStorage.getItem('userId');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
