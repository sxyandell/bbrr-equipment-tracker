export interface Equipment {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  isOwned: boolean;
  upgradeLevel: number;
  maxUpgradeLevel: number;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  equipmentLevel: number;
  maxEquipmentLevel: number;
  equipment: Equipment[];
} 