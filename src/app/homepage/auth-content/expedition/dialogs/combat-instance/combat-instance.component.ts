import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
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
  @Input() contract: any;

  user: any;

  combatInstance: any;

  npcCharacters: any;
  heroCharacters: any;

  tipText: any = "";

  uiPaths = UIPATHS;

  constructor(
    private expeditionService: ExpeditionService,
    private errorService: ErrorService,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfile();
    if (this.contract != null) {
      this.combatInstance = this.contract;
      const all = this.contract.characters;
      this.heroCharacters = all.filter((char: any) => char.characterType == 'HERO');
      this.npcCharacters = all.filter((char: any) => char.characterType != 'HERO');
    } else {
      this.loadDataCombatInstance();
    }

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

    if (this.contract == null) {
      this.expeditionService.createOrRetrieveCombatInstance({ "string": this.scenario }).then((response) => {
        this.combatInstance = response.data.data;
        const all = this.combatInstance.characters;
        this.heroCharacters = all.filter((char: any) => char.characterType == 'HERO');
        this.npcCharacters = all.filter((char: any) => char.characterType != 'HERO');

      }, (error) => {
        this.errorService.handleError(error);
      });
    } else {
      this.expeditionService.getCombatInstanceById(this.contract.id).then((response) => {
        this.combatInstance = response.data.data;
        const all = this.combatInstance.characters;
        this.heroCharacters = all.filter((char: any) => char.characterType == 'HERO');
        this.npcCharacters = all.filter((char: any) => char.characterType != 'HERO');

      }, (error) => {
        this.errorService.handleError(error);
      });
    }



  }

  loadCombatInstanceById() {
    this.expeditionService.getCombatInstanceById(this.combatInstance.id).then((response) => {
      this.combatInstance = response.data.data;

    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  splitEquipmentSlots(array: any, slot: string) {
    return array.find((element: any) => element.slot === slot);
  }

  isItemEquippedBySlot(array: any, slot: string) {
    return array.findIndex((element: any) => element.slot === slot) != -1;
  }

  openListOfCharacters() {
    if (this.combatInstance.status == 'WON_AWAIT' || this.combatInstance.status == 'LOST_AWAIT') {
      return;
    } else {
      const modalRef = this.expeditionService.openListOfCharactersDialog(this.combatInstance);
      modalRef.result.then(
        (result) => {
          this.loadDataCombatInstance();
        },
        (reason) => {
        }
      );
    }
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

    if (this.combatInstance.status != 'LOST_FINAL') {
      const equipmentCount: { [key: string]: number } = {};
      for (let s of this.combatInstance.combatReward.equipments) {
        if (!equipmentCount[s.spritePath]) {
          equipmentCount[s.spritePath] = 0;
        }
        equipmentCount[s.spritePath]++;
      }
  
      const consumableCount: { [key: string]: number } = {};
      for (let c of this.combatInstance.combatReward.consumables) {
        if (!consumableCount[c.spritePath]) {
          consumableCount[c.spritePath] = 0;
        }
        consumableCount[c.spritePath]++;
      }
  
      for (let spritePath in equipmentCount) {
        const count = equipmentCount[spritePath];
        await this.errorService.notifyNewItem(spritePath, count);
      }
  
      for (let spritePath in consumableCount) {
        const count = consumableCount[spritePath];
        await this.errorService.notifyNewItem(spritePath, count);
      }
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

  loadProfile() {
    this.profileService.getUserInfo().then((response) => {
      this.user = response.data;
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  roundCeil(long: any) {
    return Math.ceil(long);
  }

  isIndexedBySlot(index: any, slot: string) {
    const combatIndex = this.contract.indexes.filter((item: any) => item.characterIndex == index)[0];

    if (slot == 'HEAD') {
      return combatIndex.headArmor != null;
    }

    if (slot == 'BODY') {
      return combatIndex.bodyArmor != null;
    }

    if (slot == 'WEAPON') {
      return combatIndex.weapon != null;
    }

    if (slot == 'RIGHTHAND') {
      return combatIndex.shield != null;
    }

    return false;
  }

  calulateIndexItem(index: any, slot: any, tooltip: any) {
    const combatIndex = this.contract.indexes.filter((item: any) => item.characterIndex == index)[0];

    if (tooltip) {
      if (slot == 'ARMOR') {
        let headArmorValue = 0
        if (combatIndex.headArmor != null) {
          headArmorValue = combatIndex.headArmor.armorValue;
        }
        return combatIndex.headArmor.armorValue + combatIndex.bodyArmor.armorValue;
      }

      if (slot == 'WEAPON') {
        return combatIndex.shield == null ? combatIndex.weapon.atkValue : this.roundCeil(combatIndex.weapon.atkValue*0.75);
      }
    } else {
      if (slot == 'HEAD') {
        return combatIndex.headArmor;
      }
  
      if (slot == 'BODY') {
        return combatIndex.bodyArmor;
      }
  
      if (slot == 'WEAPON') {
        return combatIndex.weapon;
      }
  
      if (slot == 'RIGHTHAND') {
        return combatIndex.shield;
      }
  
      return null;
    }

  }
}
