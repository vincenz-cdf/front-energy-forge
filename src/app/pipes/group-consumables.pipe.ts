import { Pipe, PipeTransform } from '@angular/core';

interface ConsumableCountMap {
  [key: number]: {
    id: number;
    name: string;
    description: string;
    spritePath: string;
    healingAmount: number;
    healingPower: number;
    userItems: any[];
    count: number;
  };
}

@Pipe({
  name: 'groupConsumables'
})
export class GroupConsumablesPipe implements PipeTransform {

  transform(consumables: any[]): any[] {
    const result = [];
    const map: ConsumableCountMap = {};

    for (const consumable of consumables) {
      if (!map[consumable.id]) {
        map[consumable.id] = {
          ...consumable,
          count: 1
        };
        result.push(map[consumable.id]);
      } else {
        map[consumable.id].count++;
      }
    }

    return result;
  }

}
