import type { Character } from '../types/types';

export const characters: Character[] = [
  {
    id: 'ragna',
    name: 'Ragna the Bloodedge',
    image: '/characters/ragna.png',
    equipmentLevel: 1,
    maxEquipmentLevel: 10,
    equipment: [
      {
        id: 'weapon1',
        name: 'Blood Scythe',
        level: 1,
        maxLevel: 10,
        isOwned: true,
        upgradeLevel: 0,
        maxUpgradeLevel: 5
      },
      {
        id: 'armor1',
        name: 'Blood Armor',
        level: 1,
        maxLevel: 10,
        isOwned: false,
        upgradeLevel: 0,
        maxUpgradeLevel: 5
      }
    ]
  },
  {
    id: 'jin',
    name: 'Jin Kisaragi',
    image: '/characters/jin.png',
    equipmentLevel: 1,
    maxEquipmentLevel: 10,
    equipment: [
      {
        id: 'weapon1',
        name: 'Yukianesa',
        level: 1,
        maxLevel: 10,
        isOwned: true,
        upgradeLevel: 0,
        maxUpgradeLevel: 5
      },
      {
        id: 'armor1',
        name: 'Frost Armor',
        level: 1,
        maxLevel: 10,
        isOwned: false,
        upgradeLevel: 0,
        maxUpgradeLevel: 5
      }
    ]
  }
]; 