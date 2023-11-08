import { EventEmitter, Component, Output } from '@angular/core';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() goToRegister = new EventEmitter();

  login: any = "";
  password: any = "";

  constructor(
  ) {
  }

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
  }

}
