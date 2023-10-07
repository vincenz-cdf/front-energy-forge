import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  constructor(    private axiosService: AxiosService) {

  }

	@Output() loginEvent = new EventEmitter();
	@Output() logoutEvent = new EventEmitter();
  @Input() isAuth: any; 



}
