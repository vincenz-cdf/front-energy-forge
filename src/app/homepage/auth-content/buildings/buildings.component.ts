import { Component, OnInit } from '@angular/core';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  templeSpritePath = "assets/sprites/buildings/temple.png";
  tavernSpritePath = "assets/sprites/buildings/tavern.png";

  characters: any = null;

  uiPaths = UIPATHS;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService,
    private profileService: ProfileService,
    private expeditionService: ExpeditionService
  ) {}

  ngOnInit(): void {
    this.loadBuildings();
    this.loadCharacters();
  }

  loadBuildings() {
    this.playerService.listAllBuildings().then((response) => {
      console.log(response.data.data);
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  loadCharacters() {
    this.expeditionService.listAllCharactersByUserId(false).then((response) => {
      this.characters = response.data.data;
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  heal(charId: any) {
    this.playerService.healCharacterFromTemple(charId).then(() => {
      this.loadCharacters();
      this.profileService.notifyChildD();
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  drink(charId: any) {
    this.playerService.dringCharacterFromTavern(charId).then(() => {
      this.loadCharacters();
      this.profileService.notifyChildD();
    }, (error) => {
      this.errorService.handleError(error);
    });
  }
}
