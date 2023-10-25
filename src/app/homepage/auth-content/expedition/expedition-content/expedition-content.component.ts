import { Component, OnInit } from '@angular/core';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';

@Component({
  selector: 'app-expedition-content',
  templateUrl: './expedition-content.component.html',
  styleUrls: ['./expedition-content.component.css']
})
export class ExpeditionContentComponent implements OnInit {

  public choosenContent: any = 'mainmenu';
  public combatInstances: any = [];

  ngOnInit(): void {
    this.choosenContent = 'mainmenu';

  }

  constructor(private expeditionService: ExpeditionService, private errorService: ErrorService) { }

  switchContent(content: any) {
    this.choosenContent = content;

    if (this.choosenContent == 'campaign') {
      this.userCombatInstances();
    }
  }

  userCombatInstances() {
    this.expeditionService.getCombatInstanceOfUser().then((response) => {
      this.combatInstances = response.data.data
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  openCombatInstance(scenario: string, levelName: string) {
    const modalRef = this.expeditionService.combatInstanceDialog(scenario, levelName);

    modalRef.result.then(
      (result) => {
        this.userCombatInstances();
      },
      (reason) => {
        this.errorService.handleError(reason);
      }
    );
  }
}
