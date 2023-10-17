import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  @Input() isCombatInstance: boolean = false;
  @Input() combatInstanceCharactersPresentIds: any;

  @Output() characterPicked = new EventEmitter<number>();

  characters: any = null;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService,
    private expeditionService: ExpeditionService
  ) {

  }
  ngOnInit(): void {
    if(this.isCombatInstance) {
      this.loadAllYourCharacter();
    } else {
      this.listCharacters();
    }
  }

  loadAllYourCharacter() {
    this.expeditionService.listAllCharactersByUserId().then((response) => {
      this.characters = response.data.data;
      //this.characters = this.characters.filter((char: any) => !this.combatInstanceCharactersPresentIds.includes(char.id))
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  listCharacters() {
    this.playerService.list3CharactersByUserId().then((response) => {
      if (response.data.status === 'success') {
        this.characters = response.data.data;

      }
    }, (error) => {
      this.errorService.handleError(error)
    });
  }

  openDialog(char: any) {
    const modalRef = this.playerService.manageCharacterStuff(char, this.characters);

    modalRef.result.then(
      (result) => {
        this.listCharacters();
      },
      (reason) => {
      }
    );
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }
}
