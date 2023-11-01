import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
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

  @Output() characterPicked = new EventEmitter<any>();

  characters: any = null;

  uiPaths = UIPATHS;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService,
    private expeditionService: ExpeditionService,
    private toastr: ToastrService
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

    if(char.inCombat) {
      this.toastr.warning('This character is in battle','')
    } else {
      const modalRef = this.playerService.manageCharacterStuff(char, this.characters);

      modalRef.result.then(
        (result) => {
          this.listCharacters();
        },
        (reason) => {
        }
      );
    }
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }

  openAllCharactersDialog() {
    const modalRef = this.expeditionService.openListOfCharactersDialog(null);

    modalRef.result.then(
      (result) => {
        this.listCharacters();
      },
      (reason) => {
      }
    );
  }

  roundCeil(long: any) {
    return Math.ceil(long);
  }
}
