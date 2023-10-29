import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  templeSpritePath = "assets/sprites/buildings/temple2.png";
  tavernSpritePath = "assets/sprites/buildings/tavern.png";

  hpUiPath = "assets/sprites/ui/heart.png";
  recoverUiPath = "assets/sprites/ui/recover.png";
  energyUiPath = "assets/sprites/ui/energy.png";
  coinUiPath = "assets/sprites/ui/coin.png";

  characters: any = null;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadWoundedCharacters();
  }

  loadWoundedCharacters() {
    this.playerService.listWoundedChars().then((response) => {
      this.characters = response.data.data;
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  heal(charId: any) {
    this.playerService.healCharacter(charId).then(() => {
      this.loadWoundedCharacters();
    }, (error) => {
      this.errorService.handleError(error);
    });
  }
}
