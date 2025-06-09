export type EquipmentLevel = 70 | 65 | 60 | 55 | 50 | 45;
export type EquipmentType = "weapon" | "helmet" | "garment" | "gloves" | "leggings" | "necklace";

export interface EquipmentInventory {
  [type: string]: {
    [level: number]: number; // how many you have
  };
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  level: number;
  maxLevel: number;
  isOwned: boolean;
  upgradeLevel: number;
  maxUpgradeLevel: number;
  currentMore: number;
  totalNeeded: number;
  have: number;
  refineLevel: number;
  maxRefineLevel: number;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  equipmentLevel: number;
  maxEquipmentLevel: number;
  equipment: Equipment[];
  inventory: EquipmentInventory;
  haveAgent?: boolean;
} 