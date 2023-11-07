import { EventEmitter, Component, Output } from '@angular/core';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();

  email: any = "";
  login: any = "";
  password: any = "";
  confirmPassword: any = "";

  constructor(
    private errorService: ErrorService
  ) {

  }

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
  }

}
