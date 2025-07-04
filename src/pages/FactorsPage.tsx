import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalOffer as LocalOfferIcon,
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import { customColors } from '../App';
import type { Factor } from '../types/types';
import { factorBonusValues } from '../data/factors';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FactorsPageProps {
  factors: Factor[];
  onUpdateFactors?: (updatedFactors: Factor[]) => void;
}

const getTraitColor = (trait: Factor['trait']) => {
  switch (trait) {
    case 'Leech':
      return '#e91e63';
    case 'DEF':
      return '#4caf50';
    case 'STA':
      return '#ff9800';
    case 'Burst Period DMG':
      return '#f44336';
    case 'Extra DMG':
      return '#9c27b0';
    case 'STR':
      return '#2196f3';
    default:
      return '#9e9e9e';
  }
};

const getTraitIcon = (trait: Factor['trait']) => {
  switch (trait) {
    case 'Leech':
      return '🩸';
    case 'DEF':
      return '🛡️';
    case 'STA':
      return '💪';
    case 'Burst Period DMG':
      return '⚡';
    case 'Extra DMG':
      return '🗡️';
    case 'STR':
      return '💥';
    default:
      return '❓';
  }
};

const FactorsPage: React.FC<FactorsPageProps> = ({ factors, onUpdateFactors }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Determine active tab based on current route
  useEffect(() => {
    if (location.pathname === '/extra-factors') {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      navigate('/factors');
    } else {
      navigate('/extra-factors');
    }
  };

  const handleQuantityChange = (factorId: string, change: number) => {
    if (!onUpdateFactors) return;
    
    const updatedFactors = factors.map(factor => {
      if (factor.id === factorId) {
        const newQuantity = Math.max(0, factor.quantity + change);
        return { ...factor, quantity: newQuantity };
      }
      return factor;
    });
    
    onUpdateFactors(updatedFactors);
  };

  // Group factors by type
  const factorGroups = factors.reduce((groups, factor) => {
    if (!groups[factor.name]) {
      groups[factor.name] = [];
    }
    groups[factor.name].push(factor);
    return groups;
  }, {} as Record<string, Factor[]>);

  // Sort each group by level
  Object.keys(factorGroups).forEach(key => {
    factorGroups[key].sort((a, b) => a.level - b.level);
  });

  // Debug logging for factor groups
  console.log('Factor groups created:', Object.keys(factorGroups));
  Object.entries(factorGroups).forEach(([name, factors]) => {
    console.log(`${name}: ${factors.length} factors (levels ${factors.map(f => f.level).join(', ')})`);
  });

  // Debug logging to check what's received
  console.log('FactorsPage received:', factors.length, 'factors');
  console.log('Factor types received:', [...new Set(factors.map(f => f.name))]);
  console.log('Factor traits received:', [...new Set(factors.map(f => f.trait))]);

  const renderFactorCard = (factor: Factor) => (
    <Card 
      key={factor.id} 
      sx={{ 
        height: '100%',
        border: `2px solid ${factor.quantity > 0 ? getTraitColor(factor.trait) : '#666'}`,
        opacity: factor.quantity > 0 ? 1 : 0.7,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent sx={{ p: 1, textAlign: 'center' }}>
        {/* Factor Image Placeholder */}
        <Box 
          sx={{ 
            width: 24, 
            height: 24, 
            mx: 'auto', 
            mb: 0.3,
            backgroundColor: getTraitColor(factor.trait) + '20',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}
        >
          {getTraitIcon(factor.trait)}
        </Box>

        {/* Level */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.3, fontSize: '0.7rem' }}>
          Lv.{factor.level}
        </Typography>

        {/* Quantity Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.2, mb: 0.3 }}>
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(factor.id, -1)}
            sx={{ 
              backgroundColor: '#f44336',
              color: 'white',
              width: 16,
              height: 16,
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            <RemoveIcon sx={{ fontSize: '0.6rem' }} />
          </IconButton>
          
          <Typography variant="body2" sx={{ minWidth: 16, textAlign: 'center', fontWeight: 'bold', fontSize: '0.7rem' }}>
            {factor.quantity}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(factor.id, 1)}
            sx={{ 
              backgroundColor: '#4caf50',
              color: 'white',
              width: 16,
              height: 16,
              '&:hover': { backgroundColor: '#388e3c' }
            }}
          >
            <AddIcon sx={{ fontSize: '0.6rem' }} />
          </IconButton>
        </Box>

      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto', flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: customColors.periwinkle.main }}>
            <LocalOfferIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Factors Inventory
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              startIcon={<HomeIcon />}
              sx={{
                borderColor: customColors.periwinkle.main,
                color: customColors.periwinkle.main,
                '&:hover': {
                  borderColor: customColors.periwinkle[600],
                  backgroundColor: customColors.periwinkle[100],
                },
              }}
            >
              Home
            </Button>
          </Box>
        </Box>

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
              icon={<LocalOfferIcon />} 
              label="Main Factors" 
              iconPosition="start"
            />
            <Tab 
              icon={<AddCircleIcon />} 
              label="Extra Factors" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Factors can be obtained from Factor Fusion, Treasure, or Online Co-op. Factors of level higher than 1 can also be obtained from the VIP Store.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Total Factors: {factors.length} | Factor Types: {Object.keys(factorGroups).length}
            </Typography>

            {/* Factor Types Grid */}
            {Object.entries(factorGroups).map(([factorName, factorList]) => (
              <Paper key={factorName} sx={{ mb: 4, p: 3, minHeight: '200px' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: getTraitColor(factorList[0].trait) }}>
                  {getTraitIcon(factorList[0].trait)} {factorName} - {factorList[0].trait}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3, minHeight: '120px' }}>
                  {factorList.map(factor => (
                    <Box key={factor.id} sx={{ width: { xs: 'calc(16.666% - 2px)', sm: 'calc(10% - 2px)', md: 'calc(10% - 2px)', lg: 'calc(10% - 2px)' } }}>
                      {renderFactorCard(factor)}
                    </Box>
                  ))}
                </Box>
              </Paper>
            ))}
          </>
        )}

        {activeTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <Typography variant="h5" gutterBottom align="center" sx={{ color: customColors.walnut_brown.main, mb: 3 }}>
              Extra Factors Management
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
              Extra Factors can be obtained from Factor Fusion, Treasure, or Online Co-op. Extra Factors of level higher than 1 can also be obtained from the VIP Store.
            </Typography>
            <Button
              component={Link}
              to="/extra-factors"
              variant="contained"
              startIcon={<AddCircleIcon />}
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
              Go to Extra Factors
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FactorsPage; 