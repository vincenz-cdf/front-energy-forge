import { EventEmitter, Component, Output } from '@angular/core';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

	active: string = "login";
  email: string = "";
  login: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(
    private errorService: ErrorService
  ) {

  }

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
  }

  onSubmitRegister(): void {
    if(this.confirmPassword !== this.password) {
      this.errorService.notifyError("Passwords does not match")
    } else {
      this.onSubmitRegisterEvent.emit({"email": this.email, "login": this.login, "password": this.password});
    }

  }

}
