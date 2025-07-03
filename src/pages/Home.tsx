import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Character } from '../types/types';
import { customColors } from '../App';
import { grey } from '@mui/material/colors';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: customColors.walnut_brown.main, fontWeight: 700 }}>
        BlazBlue RR Equipment Tracker
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/factors"
          variant="contained"
          startIcon={<LocalOfferIcon />}
          sx={{
            backgroundColor: customColors.periwinkle.main,
            color: 'white',
            '&:hover': {
              backgroundColor: customColors.periwinkle[600],
            },
            px: 3,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          View Factors
        </Button>
      </Box>
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
                bgcolor: character.haveAgent ? customColors.periwinkle[500] : grey[700],
                color: customColors.periwinkle[100],
                borderRadius: 2,
                textDecoration: 'none',
                '&:hover': {
                  bgcolor: character.haveAgent ? customColors.periwinkle[700] : grey[800],
                  color: character.haveAgent ? customColors.periwinkle[500] : '#fff',
                  boxShadow: 4,
                },
                minWidth: 200,
                minHeight: 120,
                boxShadow: 2,
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              <Typography variant="h6" gutterBottom align="center" sx={{ color: customColors.periwinkle[100], fontWeight: 600 }}>
                {character.name}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: localStorage.getItem(`bbrr-upToDate-${character.id}`) === 'true' ? '#00FFB3' : 'orange', fontWeight: 500, mb: 1 }}>
                {localStorage.getItem(`bbrr-upToDate-${character.id}`) === 'true' ? 'Up to Date' : 'Not Up to Date'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 