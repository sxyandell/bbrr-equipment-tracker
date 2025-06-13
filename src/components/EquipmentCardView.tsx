import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import type { Character, EquipmentType } from '../types/types';

interface EquipmentCardViewProps {
  character: Character;
  onUpdateCharacter: (updatedCharacter: Character) => void;
  EQUIPMENT_TYPES: EquipmentType[];
  UPGRADE_REQUIREMENTS: Record<number, Record<number, number>>;
  TOTAL_REQUIREMENTS: Record<number, Record<number, Record<number, number>>>;
}

const LEVELS = [70, 65, 60, 55, 50, 45];

const EquipmentCardView: React.FC<EquipmentCardViewProps> = ({
  character,
  onUpdateCharacter,
  EQUIPMENT_TYPES,
  UPGRADE_REQUIREMENTS,
  TOTAL_REQUIREMENTS,
}) => {
  const firstRow = EQUIPMENT_TYPES.slice(0, 3);
  const secondRow = EQUIPMENT_TYPES.slice(3, 6);
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflowY: 'auto', p: { xs: 1, sm: 2 }, pb: 8 }}>
      {[firstRow, secondRow].map((row, rowIdx) => (
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start" sx={{ mb: rowIdx === 1 ? 6 : 2 }} key={rowIdx}>
          {row.map((type) => {
            const eq = character.equipment.find(e => e.type === type);
            if (!eq) return null;
            return (
              <Grid item xs={4} sm={4} md={4} key={type} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: 3,
                    width: 340,
                    height: 360,
                    border: '2px solid',
                    borderColor: 'divider',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ p: 3, pb: '24px !important', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" align="center" sx={{ fontSize: '0.95rem', mb: 0.5, fontWeight: 600 }}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                      <Typography variant="caption">Equip lv: {eq.level}</Typography>
                      <Typography variant="caption">Enhance lv: {eq.upgradeLevel}</Typography>
                      <Typography variant="caption">Refine lv: {eq.refineLevel}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                      <Table size="small" sx={{ fontSize: '0.85rem' }}>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ p: 0.25, fontSize: '0.85rem', fontWeight: 600 }}>lv</TableCell>
                            <TableCell sx={{ p: 0.25, fontSize: '0.85rem', fontWeight: 600 }}>total</TableCell>
                            <TableCell sx={{ p: 0.25, fontSize: '0.85rem', fontWeight: 600 }}>next</TableCell>
                            <TableCell sx={{ p: 0.25, fontSize: '0.85rem', fontWeight: 600 }}>have</TableCell>
                          </TableRow>
                          {LEVELS.map((level) => {
                            let total = 0;
                            if (TOTAL_REQUIREMENTS[eq.level] && TOTAL_REQUIREMENTS[eq.level][eq.upgradeLevel]) {
                              total = TOTAL_REQUIREMENTS[eq.level][eq.upgradeLevel][level] || 0;
                            }
                            let next = 0;
                            if (UPGRADE_REQUIREMENTS[eq.upgradeLevel] && UPGRADE_REQUIREMENTS[eq.upgradeLevel][level]) {
                              next = UPGRADE_REQUIREMENTS[eq.upgradeLevel][level];
                            }
                            const have = character.inventory[type][level] || 0;
                            return (
                              <TableRow key={level}>
                                <TableCell sx={{ p: 0.25, fontSize: '0.85rem' }}>{level}</TableCell>
                                <TableCell sx={{ p: 0.25, fontSize: '0.85rem' }}>{total}</TableCell>
                                <TableCell sx={{ p: 0.25, fontSize: '0.85rem' }}>{next}</TableCell>
                                <TableCell sx={{ p: 0.25, fontSize: '0.85rem' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton size="small" onClick={() => {
                                      const updatedInventory = { ...character.inventory };
                                      updatedInventory[type] = { ...updatedInventory[type], [level]: have + 1 };
                                      onUpdateCharacter({ ...character, inventory: updatedInventory });
                                    }}>
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="caption" sx={{ mx: 0.5 }}>{have}</Typography>
                                    <IconButton size="small" onClick={() => {
                                      const updatedInventory = { ...character.inventory };
                                      updatedInventory[type] = { ...updatedInventory[type], [level]: Math.max(0, have - 1) };
                                      onUpdateCharacter({ ...character, inventory: updatedInventory });
                                    }}>
                                      <RemoveIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ))}
    </Box>
  );
};

export default EquipmentCardView; 