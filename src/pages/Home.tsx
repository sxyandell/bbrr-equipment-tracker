import { Grid, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Character } from '../types/types';

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        BlazBlue RR Equipment Tracker
      </Typography>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Box
              component={Link}
              to={`/character/${character.id}`}
              sx={{
                display: 'block',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {character.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Equipment Level: {character.equipmentLevel}/{character.maxEquipmentLevel}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 