import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { ProfileService } from '../../profile.service';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	componentToShow: string = "welcome";
	isAuth = false;

	constructor(private axiosService: AxiosService, private profileService: ProfileService) { }

	ngOnInit(): void {
		this.handleRedirect();
	}

	handleRedirect(): void {
		if (this.axiosService.getAuthToken() !== null) {
			this.componentToShow = "messages";
			this.isAuth = true;
		} else {
			this.logout();
		}
	}

	showComponent(componentToShow: string): void {
		this.componentToShow = componentToShow;
	}


	logout() {
		this.axiosService.setAuthToken(null);
		this.profileService.setUserId(null);
		this.isAuth = false;
		this.showComponent('welcome');
	}


	onLogin(input: any): void {
		this.axiosService.request(
			"POST",
			"/login",
			{
				login: input.login,
				password: input.password
			}).then(
				response => {
					this.axiosService.setAuthToken(response.data.token);
					this.profileService.setUserId(response.data);
					this.isAuth = true;
					this.componentToShow = "messages";
				}).catch(
					error => {
						this.axiosService.setAuthToken(null);
						this.profileService.setUserId(null);
						this.isAuth = false;
						this.componentToShow = "welcome";
					}
				);

	}

	onLoginEvent() {
		this.showComponent('login');
	}

	onRegister(input: any): void {
		this.axiosService.request(
			"POST",
			"/register",
			{
				email: input.email,
				login: input.login,
				password: input.password
			}).then(
				response => {
					this.axiosService.setAuthToken(response.data.token);
					this.profileService.setUserId(response.data);
					this.isAuth = true;
					this.componentToShow = "messages";
				}).catch(
					error => {
						this.axiosService.setAuthToken(null);
						this.profileService.setUserId(null);
						this.isAuth = false;
						this.componentToShow = "welcome";
					}
				);
	}

}
