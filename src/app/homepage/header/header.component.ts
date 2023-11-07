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

  currentPage: string = "homepage";
  
  @Output() logoutEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();
  @Output() homepageEvent = new EventEmitter();
  @Output() expeditionEvent = new EventEmitter();
  @Output() buildingsEvent = new EventEmitter();
  @Output() helpEvent = new EventEmitter();

  isNavbarCollapsed = true; // Initially collapsed
  
  constructor() {
  }

  emitEvent(page: string) {
    if (page == "homepage") {
      this.homepageEvent.emit();
    }

    if (page == "expedition") {
      this.expeditionEvent.emit();
    }

    if (page == "buildings") {
      this.buildingsEvent.emit();
    }

    if (page == "help") {
      this.helpEvent.emit();
    }

    this.currentPage = page;
  }
}