import { Component, EventEmitter, Output } from '@angular/core';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent {


  @Output() onSubmitRegisterEvent = new EventEmitter();

  email: any = "";
  login: any = "";
  password: any = "";
  confirmPassword: any = "";

  constructor(
    private errorService: ErrorService
  ) {}
  


  onSubmitRegister(): void {
    if(this.confirmPassword !== this.password) {
      this.errorService.notifyError("Passwords does not match")
    } else {
      this.onSubmitRegisterEvent.emit({"email": this.email, "login": this.login, "password": this.password});
    }

  }


}
