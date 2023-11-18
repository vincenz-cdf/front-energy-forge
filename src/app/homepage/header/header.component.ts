import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
import { PlayerService } from 'src/app/dbservice/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;

  @Input() isAuth!: boolean;

  uiPaths = UIPATHS;

  currentPage: string = "homepage";

  @Output() logoutEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();
  @Output() homepageEvent = new EventEmitter();
  @Output() expeditionEvent = new EventEmitter();
  @Output() buildingsEvent = new EventEmitter();
  @Output() helpEvent = new EventEmitter();

  isNavbarCollapsed = true; // Initially collapsed

  constructor(
    private playerService: PlayerService
  ) {
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

  buyDiamonds() {
    this.playerService.manageBuyDiamondDialog();
  }
}