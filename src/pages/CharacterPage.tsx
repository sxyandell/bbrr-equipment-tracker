import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Character } from '../types/types';

interface CharacterPageProps {
  characters: Character[];
  onUpdateCharacter: (updatedCharacter: Character) => void;
}

export default function CharacterPage({ characters, onUpdateCharacter }: CharacterPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return (
      <Container>
        <Typography>Character not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Characters
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        {character.name}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Equipment Level
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(character.equipmentLevel / character.maxEquipmentLevel) * 100}
            />
          </Box>
          <Typography variant="body2">
            {character.equipmentLevel}/{character.maxEquipmentLevel}
          </Typography>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Equipment
      </Typography>
      <Grid container spacing={2}>
        {character.equipment.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Level: {item.level}/{item.maxLevel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upgrade: {item.upgradeLevel}/{item.maxUpgradeLevel}
              </Typography>
              <Typography
                variant="body2"
                color={item.isOwned ? 'success.main' : 'error.main'}
                sx={{ mt: 1 }}
              >
                {item.isOwned ? 'Owned' : 'Not Owned'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 