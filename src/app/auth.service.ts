import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private axiosService: AxiosService, private profileService: ProfileService) {

  }

  login(input: any) {
    return this.axiosService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password
      });
  }

  register(input: any) {
    return 		this.axiosService.request(
			"POST",
			"/register",
			{
				email: input.email,
				login: input.login,
				password: input.password
			});
  }

}
