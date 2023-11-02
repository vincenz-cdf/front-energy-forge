import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  fromHabitScreen: boolean = false;

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    if (this.combatInstance != null) {
    } else {
      this.fromHabitScreen = true;
    }

  }

  pickCharacter(event: any) {
    if(event.recovering) {
      this.toastr.warning('This character is recovering, hp will not recover during battle', '');
    }
    this.expeditionService.pickCharacterForCombat(event.id, this.combatInstance.id).then((response) => {
      this.activeModal.close()
    }, (error) => {
      this.errorService.handleError(error);
    });

  }

  close() {
    this.activeModal.close();
  }
}
