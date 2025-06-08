import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Character } from '../types/types';

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        BlazBlue RR Equipment Tracker
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ flex: 1, minHeight: '60vh', width: '100vw' }}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={character.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component={Link}
              to={`/character/${character.id}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                minWidth: 180,
                minHeight: 120,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" gutterBottom align="center">
                {character.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 