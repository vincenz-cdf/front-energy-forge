import { Component, OnInit } from '@angular/core';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-expedition-content',
  templateUrl: './expedition-content.component.html',
  styleUrls: ['./expedition-content.component.css']
})
export class ExpeditionContentComponent implements OnInit {

  public choosenContent: any = 'mainmenu';
  public combatInstances: any = [];

  uiPaths = UIPATHS;

  ngOnInit(): void {
    this.choosenContent = 'mainmenu';
  }

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private profileService: ProfileService) { }

  switchContent(content: any) {
    this.choosenContent = content;

    if (this.choosenContent == 'campaign') {
      this.userCombatInstances(this.choosenContent);
    }

    if (this.choosenContent == 'contracts') {
      this.userCombatInstances(this.choosenContent);
    }
  }

  userCombatInstances(content: any) {
    this.expeditionService.getCombatInstanceOfUser(content).then((response) => {
      this.combatInstances = response.data.data
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  openCombatInstance(scenario: string, levelName: string, contract: any) {
    const modalRef = this.expeditionService.combatInstanceDialog(scenario, levelName, contract);

    modalRef.result.then(
      (result) => {
        this.userCombatInstances(this.choosenContent);
        this.profileService.notifyChildD();
      },
      (reason) => {
        this.errorService.handleError(reason);
      }
    );
  }

  calculateReward(combatInstance: any) {
    const npcCharacters = combatInstance.characters.filter((char: any) => char.characterType != 'HERO');

    const minInt = 10;
    const minMult = 1;
    const maxInt = 19;
    const maxMult = 3;
    let minResult = 0;
    let maxResult = 0;

    for (let c of npcCharacters) {
      minResult += minInt + c.level * minMult;
    }

    for (let c of npcCharacters) {
      maxResult += maxInt + c.level * maxMult;
    }

    return this.roundCeil(minResult) + "-" + this.roundCeil(maxResult);
  }

  roundCeil(long: any) {
    return Math.ceil(long);
  }

}
