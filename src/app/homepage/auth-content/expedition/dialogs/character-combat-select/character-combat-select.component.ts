import { Component, Input, OnInit } from '@angular/core';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-character-combat-select',
  templateUrl: './character-combat-select.component.html',
  styleUrls: ['./character-combat-select.component.css']
})
export class CharacterCombatSelectComponent implements OnInit {

  @Input() ciId: any;
  yourChars: any;

  constructor(private expeditionService: ExpeditionService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  pickCharacter(event: number) {
    this.expeditionService.pickCharacterForCombat(event, this.ciId).then((response) => {
      console.log(response)
    });
  }
}
