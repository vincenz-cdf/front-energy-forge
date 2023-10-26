import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-character-combat-select',
  templateUrl: './character-combat-select.component.html',
  styleUrls: ['./character-combat-select.component.css']
})
export class CharacterCombatSelectComponent implements OnInit {

  @Input() combatInstance: any;

  yourChars: any;
  combatInstanceCharactersPresents: any;
  fromHabitScreen: boolean = false;

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.combatInstance != null) {
      this.combatInstanceCharactersPresents = this.combatInstance.characters;
    } else {
      this.fromHabitScreen = true;
      this.combatInstanceCharactersPresents = null;
    }

  }

  pickCharacter(event: number) {
    this.expeditionService.pickCharacterForCombat(event, this.combatInstance.id).then((response) => {
      this.activeModal.close()
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  close() {
    this.activeModal.close();
  }
}
