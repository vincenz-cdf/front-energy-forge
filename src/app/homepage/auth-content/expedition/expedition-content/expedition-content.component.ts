import { Component, OnInit } from '@angular/core';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { PlayerService } from 'src/app/dbservice/player.service';

@Component({
  selector: 'app-expedition-content',
  templateUrl: './expedition-content.component.html',
  styleUrls: ['./expedition-content.component.css']
})
export class ExpeditionContentComponent implements OnInit {

  public choosenContent: any = 'mainmenu';

  ngOnInit(): void {
    this.choosenContent = 'mainmenu';
  }

  constructor(private expeditionService: ExpeditionService) {}

  switchContent(content: any) {
    this.choosenContent = content;
  }

  openCombatInstance(scenario: string, levelName: string) {
    const modalRef = this.expeditionService.combatInstanceDialog(scenario, levelName);

    modalRef.result.then(
      (result) => {
        //faire qqchose
      },
      (reason) => {
      }
    );
  }
}
