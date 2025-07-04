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

export type FactorTrait = "Leech" | "DEF" | "STA" | "Burst Period DMG" | "Extra DMG" | "STR";
export type FactorName = "Vampire" | "Resist" | "Vigour" | "Surge" | "Excess" | "Force";

export interface Factor {
  id: string;
  name: FactorName;
  trait: FactorTrait;
  level: number;
  maxLevel: number;
  quantity: number; // how many of this level you have
  bonus: number;
  combinations: Array<{
    factors: FactorName[];
    result: string;
  }>;
  upgradeConditions: {
    materials: Array<{
      id: string;
      name: string;
      required: number;
      owned: number;
    }>;
    characterLevel?: number;
    equipmentLevel?: number;
    otherFactors?: string[];
  };
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
  factors?: Factor[];
} 