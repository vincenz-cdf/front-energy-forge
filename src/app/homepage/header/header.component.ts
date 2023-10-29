import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;

  @Input() isAuth!: boolean;

  @Output() logoutEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();
  @Output() homepageEvent = new EventEmitter();
  @Output() expeditionEvent = new EventEmitter();
  @Output() buildingsEvent = new EventEmitter();
  
  constructor() {
  }


}