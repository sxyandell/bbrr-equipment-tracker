import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import AddEquipmentDialog from '../components/AddEquipmentDialog';
import { useState } from 'react';
import type { Character, Equipment, EquipmentType, EquipmentLevel } from '../types/types';

interface CharacterPageProps {
  characters: Character[];
  onUpdateCharacter: (updatedCharacter: Character) => void;
}

const EQUIPMENT_TYPES: EquipmentType[] = [
  'weapon',
  'helmet',
  'garment',
  'gloves',
  'leggings',
  'necklace',
];
const EQUIPMENT_LEVELS: EquipmentLevel[] = [70, 65, 60, 55, 50, 45];

const UPGRADE_REQUIREMENTS: Record<number, Record<number, number>> = {
  40: { 45: 1 },
  45: { 50: 1, 45: 2 },
  50: { 55: 1, 50: 2, 45: 3 },
  55: { 60: 1, 55: 2, 50: 3 },
  60: { 65: 1, 60: 2, 55: 3 },
  65: { 70: 1, 65: 2, 60: 3 },
};


const TOTAL_REQUIREMENTS: Record<number, Record<number, Record<number, number>>> = {
  70: {
    40: { 70: 1, 65: 3, 60: 6, 55: 6, 50: 6, 45: 6 },
    45: { 70: 1, 65: 3, 60: 6, 55: 6, 50: 6, 45: 5 },
    50: { 70: 1, 65: 3, 60: 6, 55: 6, 50: 5, 45: 3 },
    55: { 70: 1, 65: 3, 60: 6, 55: 5, 50: 3, 45: 0 },
    60: { 70: 1, 65: 3, 60: 5, 55: 3, 50: 0, 45: 0 },
    65: { 70: 1, 65: 2, 60: 3, 55: 0, 50: 0, 45: 0 },
    70: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
  65: {
    40: { 70: 0, 65: 1, 60: 3, 55: 6, 50: 6, 45: 6 },
    45: { 70: 0, 65: 1, 60: 3, 55: 6, 50: 6, 45: 5 },
    50: { 70: 0, 65: 1, 60: 3, 55: 6, 50: 5, 45: 3 },
    55: { 70: 0, 65: 1, 60: 3, 55: 5, 50: 3, 45: 0 },
    60: { 70: 0, 65: 1, 60: 2, 55: 3, 50: 0, 45: 0 },
    65: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
  60: {
    40: { 70: 0, 65: 0, 60: 1, 55: 3, 50: 6, 45: 6 },
    45: { 70: 0, 65: 0, 60: 1, 55: 3, 50: 6, 45: 5 },
    50: { 70: 0, 65: 0, 60: 1, 55: 3, 50: 5, 45: 3 },
    55: { 70: 0, 65: 0, 60: 1, 55: 2, 50: 3, 45: 0 },
    60: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    65: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
  55: {
    40: { 70: 0, 65: 0, 60: 0, 55: 1, 50: 3, 45: 6 },
    45: { 70: 0, 65: 0, 60: 0, 55: 1, 50: 3, 45: 5 },
    50: { 70: 0, 65: 0, 60: 0, 55: 1, 50: 2, 45: 3 },
    55: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    60: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    65: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
  50: {
    40: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 1, 45: 3 },
    45: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 1, 45: 2 },
    50: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    55: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    60: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    65: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
  45: {
    40: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 1 },
    45: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    50: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    55: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    60: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
    65: { 70: 0, 65: 0, 60: 0, 55: 0, 50: 0, 45: 0 },
  },
};

export default function CharacterPage({ characters, onUpdateCharacter }: CharacterPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return (
      <Container>
        <Typography>Character not found</Typography>
      </Container>
    );
  }

  const handleAddEquipment = (newEquipment: Equipment) => {
    const updatedCharacter = {
      ...character,
      equipment: [...character.equipment, newEquipment],
    };
    onUpdateCharacter(updatedCharacter);
  };

  const handleUpgrade = (equipmentType: EquipmentType) => {
    const eq = character.equipment.find(e => e.type === equipmentType);
    if (!eq) return;
    const currentEnhanceLevel = eq.upgradeLevel;
    const nextEnhanceLevel = Math.min(currentEnhanceLevel + 5, 70);
    const requirements = UPGRADE_REQUIREMENTS[currentEnhanceLevel] || {};
    // Decrease have for each required level
    const updatedInventory = { ...character.inventory };
    const typeInventory = { ...updatedInventory[equipmentType] };
    Object.entries(requirements).forEach(([levelStr, amount]) => {
      const level = Number(levelStr);
      typeInventory[level] = Math.max(0, (typeInventory[level] || 0) - amount);
    });
    updatedInventory[equipmentType] = typeInventory;
    const updatedEquipment = character.equipment.map(item =>
      item.type === equipmentType
        ? {
            ...item,
            upgradeLevel: nextEnhanceLevel
          }
        : item
    );
    onUpdateCharacter({ ...character, equipment: [...updatedEquipment], inventory: updatedInventory });
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, overflow: 'hidden', bgcolor: 'background.default' }}>
      <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'column', height: '100vh', p: 0, m: 0 }}>
        <Box sx={{ flexShrink: 0, p: 1, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Back to Characters
            </Button>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: 'center', m: 0 }}>
              {character.name} - Inventory Management
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!character.haveAgent}
                onChange={(_, checked) => {
                  onUpdateCharacter({ ...character, haveAgent: checked });
                }}
                color="success"
              />
            }
            label="Have Agent"
            sx={{ mr: 2 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, width: '100vw', height: '100%', overflow: 'auto', p: 0, m: 0 }}>
          <TableContainer component={Paper} sx={{ width: '100vw', maxWidth: '100vw', height: '100%', m: 0, p: 0, borderRadius: 0 }}>
            <Table size="small" sx={{ minWidth: 1200, tableLayout: 'fixed', fontSize: '0.9rem' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell sx={{ fontSize: '1rem', py: 1, minWidth: 80 }}></TableCell>
                  {EQUIPMENT_TYPES.map((type) => (
                    <TableCell key={type} align="center" colSpan={3} sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1, minWidth: 140 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ fontSize: '0.8rem', py: 0.5, px: 1, minWidth: 0 }}
                          onClick={() => {
                            const eq = character.equipment.find(item => item.type === type);
                            if (!eq) return;
                            const currentEnhanceLevel = eq.upgradeLevel;
                            const nextEnhanceLevel = Math.min(currentEnhanceLevel + 5, 70);
                            const requirements = UPGRADE_REQUIREMENTS[currentEnhanceLevel] || {};
                            // Decrease have for each required level
                            const updatedInventory = { ...character.inventory };
                            const typeInventory = { ...updatedInventory[type] };
                            Object.entries(requirements).forEach(([levelStr, amount]) => {
                              const level = Number(levelStr);
                              typeInventory[level] = Math.max(0, (typeInventory[level] || 0) - amount);
                            });
                            updatedInventory[type] = typeInventory;
                            const updatedEquipment = character.equipment.map(item =>
                              item.type === type
                                ? {
                                    ...item,
                                    upgradeLevel: nextEnhanceLevel
                                  }
                                : item
                            );
                            onUpdateCharacter({ ...character, equipment: [...updatedEquipment], inventory: updatedInventory });
                          }}
                        >
                          Upgrade
                        </Button>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Equipped lv row */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', py: 1, minWidth: 80 }}>equipped lv</TableCell>
                  {EQUIPMENT_TYPES.map((type) => {
                    const eq = character.equipment.find(e => e.type === type);
                    return [
                      <TableCell key={type + '-eq-lv'} align="center" colSpan={3} sx={{ py: 1, minWidth: 140 }}>
                        <select
                          value={eq ? eq.level : ''}
                          style={{ width: 60, textAlign: 'center', fontSize: '0.95rem', padding: '3px' }}
                          onChange={e => {
                            if (!eq) return;
                            const newLevel = Number(e.target.value);
                            const updatedEquipment = character.equipment.map(item =>
                              item.type === type ? { ...item, level: newLevel } : item
                            );
                            onUpdateCharacter({ ...character, equipment: updatedEquipment });
                          }}
                        >
                          {[...Array(6)].map((_, i) => {
                            const val = 70 - i * 5;
                            return <option key={val} value={val}>{val}</option>;
                          })}
                        </select>
                      </TableCell>
                    ];
                  })}
                </TableRow>
                {/* Enhance lv row */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', py: 1, minWidth: 80 }}>enhance lv</TableCell>
                  {EQUIPMENT_TYPES.map((type) => {
                    const eq = character.equipment.find(e => e.type === type);
                    return [
                      <TableCell key={type + '-eq-enh'} align="center" colSpan={3} sx={{ py: 1, minWidth: 140 }}>
                        <select
                          value={eq ? eq.upgradeLevel : ''}
                          style={{ width: 60, textAlign: 'center', fontSize: '0.95rem', padding: '3px' }}
                          onChange={e => {
                            if (!eq) return;
                            const newEnh = Number(e.target.value);
                            const updatedEquipment = character.equipment.map(item =>
                              item.type === type ? { ...item, upgradeLevel: newEnh } : item
                            );
                            onUpdateCharacter({ ...character, equipment: [...updatedEquipment] });
                          }}
                        >
                          {[...Array(7)].map((_, i) => {
                            const val = 70 - i * 5;
                            return <option key={val} value={val}>{val}</option>;
                          })}
                        </select>
                      </TableCell>
                    ];
                  })}
                </TableRow>
                {/* Refine lv row */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', py: 1, minWidth: 80 }}>refine lv</TableCell>
                  {EQUIPMENT_TYPES.map((type) => {
                    const eq = character.equipment.find(e => e.type === type);
                    return [
                      <TableCell key={type + '-eq-ref'} align="center" colSpan={3} sx={{ py: 1, minWidth: 140 }}>
                        <select
                          value={eq ? eq.refineLevel : ''}
                          style={{ width: 60, textAlign: 'center', fontSize: '0.95rem', padding: '3px' }}
                          onChange={e => {
                            if (!eq) return;
                            const newRef = Number(e.target.value);
                            const updatedEquipment = character.equipment.map(item =>
                              item.type === type ? { ...item, refineLevel: newRef } : item
                            );
                            onUpdateCharacter({ ...character, equipment: updatedEquipment });
                          }}
                        >
                          {[...Array(9)].map((_, i) => (
                            <option key={8 - i} value={8 - i}>{8 - i}</option>
                          ))}
                        </select>
                      </TableCell>
                    ];
                  })}
                </TableRow>
                {/* c more/total/have header row */}
                <TableRow sx={{ backgroundColor: 'action.selected' }}>
                  <TableCell sx={{ py: 1, minWidth: 80 }}></TableCell>
                  {EQUIPMENT_TYPES.map((type) => [
                    <TableCell key={type + '-t'} align="center" sx={{ fontSize: '0.9rem', py: 1, minWidth: 40 }}>total</TableCell>,
                    <TableCell key={type + '-c'} align="center" sx={{ fontSize: '0.9rem', py: 1, minWidth: 40 }}>more</TableCell>,
                    <TableCell key={type + '-h'} align="center" sx={{ fontSize: '0.9rem', py: 1, minWidth: 40 }}>have</TableCell>,
                  ])}
                </TableRow>
                {/* For each equipment level, show c more, total, have for each type */}
                {EQUIPMENT_LEVELS.map((level) => (
                  <TableRow key={'row-' + level} sx={{ py: 0.5 }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', py: 1, minWidth: 80 }}>{level}</TableCell>
                    {EQUIPMENT_TYPES.map((type) => {
                      const have = character.inventory[type][level] || 0;
                      const eq = character.equipment.find(e => e.type === type);
                      let more = 0;
                      if (eq && UPGRADE_REQUIREMENTS[eq.upgradeLevel] && UPGRADE_REQUIREMENTS[eq.upgradeLevel][level]) {
                        const needed = UPGRADE_REQUIREMENTS[eq.upgradeLevel][level];
                        more = Math.max(0, needed - have);
                      }
                      // Use the 2D lookup table for total
                      let total = 0;
                      if (eq && eq.upgradeLevel >= 40 && eq.level >= 45 && TOTAL_REQUIREMENTS[eq.level] && TOTAL_REQUIREMENTS[eq.level][eq.upgradeLevel]) {
                        total = TOTAL_REQUIREMENTS[eq.level][eq.upgradeLevel][level] || 0;
                      }
                      return [
                        <TableCell key={type + '-' + level + '-t'} align="center" sx={{ fontSize: '0.9rem', py: 1, minWidth: 40 }}>{total}</TableCell>,
                        <TableCell key={type + '-' + level + '-c'} align="center" sx={{ fontSize: '0.9rem', py: 1, minWidth: 40 }}>{more}</TableCell>,
                        <TableCell key={type + '-' + level + '-h'} align="center" sx={{ fontSize: '0.9rem', py: 0.5, minWidth: 40 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box component="span" sx={{ mx: 1 }}>{have}</Box>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                const updated = { ...character.inventory };
                                updated[type][level] = (updated[type][level] || 0) + 1;
                                onUpdateCharacter({ ...character, inventory: updated });
                              }}
                              sx={{ minWidth: 0, px: 1, fontSize: '0.9rem', ml: 0.5 }}
                            >
                              +
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                const updated = { ...character.inventory };
                                updated[type][level] = Math.max(0, updated[type][level] - 1);
                                onUpdateCharacter({ ...character, inventory: updated });
                              }}
                              sx={{ minWidth: 0, px: 1, fontSize: '0.9rem', ml: 0.5 }}
                            >
                              -
                            </Button>
                          </Box>
                        </TableCell>
                      ];
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
} 