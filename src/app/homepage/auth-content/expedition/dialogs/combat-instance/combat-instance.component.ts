import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-combat-instance',
  templateUrl: './combat-instance.component.html',
  styleUrls: ['./combat-instance.component.css']
})
export class CombatInstanceComponent implements OnInit {

  @Input() scenario: any;
  @Input() levelName: string = "";

  combatInstance: any;

  npcCharacters: any;
  heroCharacters: any;

  tipText: any = "";

  hpUiPath = "assets/sprites/ui/heart.png"
  armorUiPath = "assets/sprites/ui/armor.png"
  attackUiPath = "assets/sprites/ui/damage.png"
  moodHighUiPath = "assets/sprites/ui/mood2.png"
  moodMidUiPath = "assets/sprites/ui/mood1.png"
  moodLowUiPath = "assets/sprites/ui/mood0.png"

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadDataCombatInstance();
    this.loadTip();
  }

  loadTip() {
    switch (this.scenario) {
      case "T_L1":
        this.tipText = "Strength in Numbers: Deploy both of your starting characters into combat to overpower a lone unarmed enemy.";
        break;
      case "T_L2":
        this.tipText = "Shield Breaker: Facing enemies with shields? Equip one of your characters with an axe. Shields are vulnerable to axe attacks!";
        break;
      case "T_L3":
        this.tipText = "Ranged Supremacy : Characters equipped with ranged weapons reduce the enemy highest damage by 50% IF one of it's neighbour is equipped with a melee weapon";
        break;
      case "T_L4":
        this.tipText = "Armor Problem : Equip your characters with the knife to have a chance to ignore and the pickake to break the armor";
        break;
      default:
        break;
    }
  }

  loadDataCombatInstance() {
    this.expeditionService.createOrRetrieveCombatInstance({ "string": this.scenario }).then((response) => {
      this.combatInstance = response.data.data;
      this.loadDataCharacters(response.data.data.id);

    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  loadCombatInstanceById() {
    this.expeditionService.getCombatInstanceById(this.combatInstance.id).then((response) => {
      this.combatInstance = response.data.data;

    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  loadDataCharacters(ciId: any) {
    this.expeditionService.listAllCharactersByCI(ciId).then((response) => {
      const all = response.data.data;
      this.heroCharacters = all.filter((char: any) => char.characterType == 'HERO');
      this.npcCharacters = all.filter((char: any) => char.characterType != 'HERO');
    }, (error) => {
      this.errorService.handleError(error);
    });
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }

  openListOfCharacters() {
    const modalRef = this.expeditionService.openListOfCharactersDialog(this.combatInstance);

    modalRef.result.then(
      (result) => {
        this.loadDataCombatInstance();
      },
      (reason) => {
      }
    );
  }

  close() {
    this.activeModal.close();
  }

  launchCombat() {
    this.expeditionService.launchCombatInstance(this.combatInstance.id).then(() => {
      this.loadCombatInstanceById();
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

  async seeCombatResult() {
    await this.errorService.notifyCombatResult(this.combatInstance);
    for (let s of this.combatInstance.combatReward.equipments) {
      await this.errorService.notifyNewEquipment(s.spritePath);
    }

    this.expeditionService.gatherRewards(this.combatInstance.id).then(() => {
      this.loadCombatInstanceById();
      this.profileService.notifyChildD();
      this.activeModal.close();
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

  pickCharacter(charId: any) {
    this.expeditionService.pickCharacterForCombat(charId, this.combatInstance.id).then((response) => {
      this.loadDataCombatInstance();
    }, (error) => {
      this.errorService.handleError(error);
    });
  }
}
