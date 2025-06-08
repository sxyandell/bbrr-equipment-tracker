import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import type { Equipment } from '../types/types';

interface AddEquipmentDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (equipment: Equipment) => void;
}

export default function AddEquipmentDialog({ open, onClose, onAdd }: AddEquipmentDialogProps) {
  const [equipment, setEquipment] = useState<Partial<Equipment>>({
    name: '',
    level: 1,
    maxLevel: 100,
    isOwned: true,
    upgradeLevel: 0,
    maxUpgradeLevel: 10,
    currentMore: 0,
    totalNeeded: 0,
    have: 0,
    refineLevel: 0,
    maxRefineLevel: 10,
  });

  const handleSubmit = () => {
    if (equipment.name) {
      onAdd({
        id: `equipment-${Date.now()}`,
        name: equipment.name,
        level: equipment.level || 1,
        maxLevel: equipment.maxLevel || 100,
        isOwned: equipment.isOwned || true,
        upgradeLevel: equipment.upgradeLevel || 0,
        maxUpgradeLevel: equipment.maxUpgradeLevel || 10,
        currentMore: equipment.currentMore || 0,
        totalNeeded: equipment.totalNeeded || 0,
        have: equipment.have || 0,
        refineLevel: equipment.refineLevel || 0,
        maxRefineLevel: equipment.maxRefineLevel || 10,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Equipment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Equipment Name"
              value={equipment.name}
              onChange={(e) => setEquipment({ ...equipment, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Level"
              value={equipment.level}
              onChange={(e) => setEquipment({ ...equipment, level: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Enhance Level"
              value={equipment.upgradeLevel}
              onChange={(e) => setEquipment({ ...equipment, upgradeLevel: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Refine Level"
              value={equipment.refineLevel}
              onChange={(e) => setEquipment({ ...equipment, refineLevel: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Have"
              value={equipment.have}
              onChange={(e) => setEquipment({ ...equipment, have: Number(e.target.value) })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Equipment
        </Button>
      </DialogActions>
    </Dialog>
  );
} 