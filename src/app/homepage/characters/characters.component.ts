import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: any = null;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService
  ) {

  }
  ngOnInit(): void {
    this.listCharacters();
  }

  listCharacters() {
    this.playerService.listCharactersByUserId().then((response) => {
      if (response.data.status === 'success') {
        this.characters = response.data.data;
        for(let i of this.characters) {
          this.playerService.listEquippedItemsByCharId(i.id).then((response) => {
            i.equippedItems.push(response.data.data);
          });
        }
      }
    }, (error) => {
      this.errorService.handleError(error)
    });
  }
  openDialog(char: any) {
    this.playerService.manageCharacterStuff(char);
  }
}
