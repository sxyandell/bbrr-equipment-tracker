import type { Factor, FactorName } from '../types/types';

// Generate all factors for each type and level
const generateFactors = (): Factor[] => {
  const factorTypes: Array<{ name: FactorName; trait: Factor['trait']; bonusValues: number[] }> = [
    {
      name: "Vampire",
      trait: "Leech",
      bonusValues: [10, 20, 40, 70, 120, 200, 300, 520, 780]
    },
    {
      name: "Resist",
      trait: "DEF",
      bonusValues: [50, 100, 200, 350, 600, 1000, 1650, 2600, 3900]
    },
    {
      name: "Vigour",
      trait: "STA",
      bonusValues: [75, 150, 300, 525, 900, 1500, 2475, 3900, 5850]
    },
    {
      name: "Surge",
      trait: "Burst Period DMG",
      bonusValues: [200, 400, 800, 1400, 2400, 4000, 6600, 10400, 15600]
    },
    {
      name: "Excess",
      trait: "Extra DMG",
      bonusValues: [100, 200, 400, 700, 1200, 2000, 3300, 5200, 7800]
    },
    {
      name: "Force",
      trait: "STR",
      bonusValues: [75, 150, 300, 525, 900, 1500, 2475, 3900, 5850]
    }
  ];

  const factors: Factor[] = [];

  factorTypes.forEach(({ name, trait, bonusValues }) => {
    for (let level = 1; level <= 9; level++) {
      factors.push({
        id: `factor_${name.toLowerCase()}_${level}`,
        name,
        trait,
        level,
        maxLevel: 9,
        quantity: 0, // Start with 0 quantity
        bonus: bonusValues[level - 1],
        combinations: getCombinations(name),
        upgradeConditions: {
          materials: []
        }
      });
    }
  });

  return factors;
};

const getCombinations = (factorName: FactorName) => {
  const combinations: Record<FactorName, Array<{ factors: FactorName[]; result: string }>> = {
    Vampire: [
      { factors: ["Vampire", "Resist"], result: "Move Speed" },
      { factors: ["Vampire", "Resist", "Vigour"], result: "Endure Trap odds" }
    ],
    Resist: [
      { factors: ["Resist", "Vigour"], result: "Move Speed" },
      { factors: ["Resist", "Vigour"], result: "Defense Armor" },
      { factors: ["Resist", "Vigour", "Surge"], result: "Trap DMG Reduce" }
    ],
    Vigour: [
      { factors: ["Vigour", "Surge"], result: "Move Speed" },
      { factors: ["Vigour", "Surge"], result: "Fall Armor" },
      { factors: ["Vigour", "Surge", "Excess"], result: "1/5 odds get Def Rage" }
    ],
    Surge: [
      { factors: ["Surge", "Excess"], result: "DMG to Mob" },
      { factors: ["Surge", "Excess"], result: "DMG" },
      { factors: ["Surge", "Excess", "Force"], result: "DMG to BOSS" }
    ],
    Excess: [
      { factors: ["Excess", "Force"], result: "DMG to Mob" },
      { factors: ["Excess", "Force"], result: "1/5 odds cut foe Rage" },
      { factors: ["Vampire", "Excess", "Force"], result: "Attack Armor" }
    ],
    Force: [
      { factors: ["Vampire", "Force"], result: "DMG to Mob" },
      { factors: ["Vampire", "Force"], result: "1/5 odds get Def Rage" },
      { factors: ["Vampire", "Resist", "Force"], result: "DMG to Hero" }
    ]
  };

  return combinations[factorName] || [];
};

export const factors: Factor[] = generateFactors();

// Factor bonus values for each level (for reference)
export const factorBonusValues: Record<FactorName, number[]> = {
  Vampire: [10, 20, 40, 70, 120, 200, 300, 520, 780],
  Resist: [50, 100, 200, 350, 600, 1000, 1650, 2600, 3900],
  Vigour: [75, 150, 300, 525, 900, 1500, 2475, 3900, 5850],
  Surge: [200, 400, 800, 1400, 2400, 4000, 6600, 10400, 15600],
  Excess: [100, 200, 400, 700, 1200, 2000, 3300, 5200, 7800],
  Force: [75, 150, 300, 525, 900, 1500, 2475, 3900, 5850]
}; 