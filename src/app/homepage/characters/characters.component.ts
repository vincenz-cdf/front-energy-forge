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
  @Input() combatInstanceCharactersPresents: any;
  @Input() fromHabitScreen: boolean = false;

  @Output() characterPicked = new EventEmitter<number>();

  characters: any = null;

  hpUiPath = "assets/sprites/ui/heart.png"
  armorUiPath = "assets/sprites/ui/armor.png"
  attackUiPath = "assets/sprites/ui/damage.png"
  moodHighUiPath = "assets/sprites/ui/mood2.png"
  moodMidUiPath = "assets/sprites/ui/mood1.png"
  moodLowUiPath = "assets/sprites/ui/mood0.png"
  recoverUiPath = "assets/sprites/ui/recover.png"

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService,
    private expeditionService: ExpeditionService
  ) {

  }
  ngOnInit(): void {

    if(this.isCombatInstance || this.fromHabitScreen) {
      this.loadAllYourCharacter();
    } else {
      this.listCharacters();
    }
  }

  loadAllYourCharacter() {
    this.expeditionService.listAllCharactersByUserId(this.fromHabitScreen).then((response) => {
      this.characters = response.data.data;
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

  openAllCharactersDialog() {
    this.expeditionService.openListOfCharactersDialog(null);
  }
}
