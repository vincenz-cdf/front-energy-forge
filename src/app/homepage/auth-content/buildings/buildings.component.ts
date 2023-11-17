import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UIPATHS } from 'src/app/consts/ui-paths.constants';
import { ExpeditionService } from 'src/app/dbservice/expedition.service';
import { PlayerService } from 'src/app/dbservice/player.service';
import { ErrorService } from 'src/app/error.service';
import { ProfileService } from 'src/app/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  characters: any = null;
  buildings: any = null;

  uiPaths = UIPATHS;

  combinedItems: any;

  constructor(
    private playerService: PlayerService,
    private errorService: ErrorService,
    private profileService: ProfileService,
    private expeditionService: ExpeditionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBuildings();
    this.loadCharacters();
  }

  loadBuildings() {
    this.playerService.listAllBuildings().then((response) => {
      this.buildings = response.data.data;
      this.combineMarketItems();
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  loadCharacters() {
    this.expeditionService.listAllCharactersByUserId(false).then((response) => {
      this.characters = response.data.data;
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  heal(charId: any) {
    this.playerService.healCharacterFromTemple(charId).then(() => {
      this.loadCharacters();
      this.profileService.notifyChildD();
    }, (error) => {
      this.toastr.error(error.response.data.message, '')
    });
  }

  drink(charId: any) {
    this.playerService.dringCharacterFromTavern(charId).then(() => {
      this.loadCharacters();
      this.profileService.notifyChildD();
    }, (error) => {
      this.toastr.error(error.response.data.message, '')
    });
  }

  combineMarketItems() {
    // Assuming buildings is already defined and populated
    const marketItemPool = this.buildings[2].marketItemPool;
    this.combinedItems = [
      ...marketItemPool.weapons.map((w: any) => ({ ...w, type: 'weapon' })),
      ...marketItemPool.armors.map((a: any) => ({ ...a, type: 'armor' })),
      ...marketItemPool.consumables.map((c: any) => ({ ...c, type: 'consumable' }))
    ];
  }

  allCharactersHealthy(): boolean {
      // This function checks if all characters are healthy
      return !this.characters.some((char: any) => !char.recovering && char.hp !== char.maxHp);

  }

  allCharactersHappy(): boolean {
    // This function checks if all characters have full morale
    return this.characters.every((char: any) => char.morale === char.maxMorale);
  }

  buyItem(item: any, type: any, name: any) {

    let itemId: any = null;

    if (type == "weapon" || type == "armor") {
      itemId = item.equipment.id;
    } else {
      itemId = item.id;
    }

    Swal.fire({
      title: 'Do you want to buy ' + name + ' ?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.playerService.buyItem(itemId, type).then(() => {
          this.loadBuildings();
          this.profileService.notifyChildD();
        }, (error) => {
          this.toastr.error(error.response.data.message, '')
        });
      } else if (result.isDenied) {
        return;
      }
    })
  }

  refreshMarket() {
    this.playerService.refreshMarket().then(() => {
      this.loadBuildings();
    }, (error) => {
      this.errorService.notifyError(error);
    });
  }

}
