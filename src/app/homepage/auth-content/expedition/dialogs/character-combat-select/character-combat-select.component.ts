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
  combatInstanceCharactersPresentIds: any;

  constructor(
    private expeditionService: ExpeditionService, 
    private errorService: ErrorService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.combatInstanceCharactersPresentIds = this.combatInstance.characterIds;
  }

  close() {
    this.activeModal.close();
  }

  pickCharacter(event: number) {
    this.expeditionService.pickCharacterForCombat(event, this.combatInstance.id).then((response) => {
      this.activeModal.close()
    }, (error) => {
      this.errorService.handleError(error);
    });
  }
}
