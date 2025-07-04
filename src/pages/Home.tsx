import { Grid, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Character } from '../types/types';
import { customColors } from '../App';
import { grey } from '@mui/material/colors';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Determine active tab based on current route
  useEffect(() => {
    if (location.pathname === '/factors' || location.pathname === '/extra-factors') {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      navigate('/');
    } else {
      navigate('/factors');
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Typography variant="h3" component="h1" align="center" sx={{ color: customColors.walnut_brown.main, fontWeight: 700, mt: 3, mb: 2 }}>
        BlazBlue RR Equipment Tracker
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: customColors.walnut_brown.main,
              '&.Mui-selected': {
                color: customColors.periwinkle.main,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: customColors.periwinkle.main,
            },
          }}
        >
          <Tab 
            icon={<PersonIcon />} 
            label="Equipment Tracker" 
            iconPosition="start"
          />
          <Tab 
            icon={<LocalOfferIcon />} 
            label="Factors" 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '60vh', width: '100vw' }}>
            {characters.map((character) => (
              <Box key={character.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)', lg: 'calc(25% - 18px)' }, display: 'flex', justifyContent: 'center' }}>
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
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ color: customColors.walnut_brown.main, mb: 3 }}>
            Factor Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
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
              Main Factors
            </Button>
            <Button
              component={Link}
              to="/extra-factors"
              variant="outlined"
              startIcon={<LocalOfferIcon />}
              sx={{
                borderColor: customColors.periwinkle.main,
                color: customColors.periwinkle.main,
                '&:hover': {
                  borderColor: customColors.periwinkle[600],
                  backgroundColor: customColors.periwinkle[100],
                },
                px: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              Extra Factors
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
} 