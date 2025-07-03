import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalOffer as LocalOfferIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { customColors } from '../App';
import type { Factor } from '../types/types';
import { Link } from 'react-router-dom';

interface ExtraFactorsPageProps {
  extraFactors: Factor[];
  onUpdateExtraFactors?: (updatedFactors: Factor[]) => void;
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

const ExtraFactorsPage: React.FC<ExtraFactorsPageProps> = ({ extraFactors, onUpdateExtraFactors }) => {
  // Debug log to check what's received
  console.log('ExtraFactorsPage received:', extraFactors.length, 'factors');
  console.log('Factor types received:', [...new Set(extraFactors.map(f => f.name))]);
  console.log('All factor names received:', extraFactors.map(f => f.name));
  console.log('All factor traits received:', extraFactors.map(f => f.trait));
  const handleQuantityChange = (factorId: string, change: number) => {
    if (!onUpdateExtraFactors) return;
    
    const updatedFactors = extraFactors.map(factor => {
      if (factor.id === factorId) {
        const newQuantity = Math.max(0, factor.quantity + change);
        return { ...factor, quantity: newQuantity };
      }
      return factor;
    });
    
    onUpdateExtraFactors(updatedFactors);
  };

  // Group factors by type
  const factorGroups = extraFactors.reduce((groups, factor) => {
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
            width: 40, 
            height: 40, 
            mx: 'auto', 
            mb: 0.5,
            backgroundColor: getTraitColor(factor.trait) + '20',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}
        >
          {getTraitIcon(factor.trait)}
        </Box>

        {/* Level */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: '0.9rem' }}>
          Lv.{factor.level}
        </Typography>

        {/* Quantity Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(factor.id, -1)}
            sx={{ 
              backgroundColor: '#f44336',
              color: 'white',
              width: 24,
              height: 24,
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            <RemoveIcon sx={{ fontSize: '0.8rem' }} />
          </IconButton>
          
          <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center', fontWeight: 'bold' }}>
            {factor.quantity}
          </Typography>
          
          <IconButton 
            size="small" 
            onClick={() => handleQuantityChange(factor.id, 1)}
            sx={{ 
              backgroundColor: '#4caf50',
              color: 'white',
              width: 24,
              height: 24,
              '&:hover': { backgroundColor: '#388e3c' }
            }}
          >
            <AddIcon sx={{ fontSize: '0.8rem' }} />
          </IconButton>
        </Box>


      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: customColors.periwinkle.main }}>
          <LocalOfferIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Factors Inventory
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/factors"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: customColors.periwinkle.main,
              color: customColors.periwinkle.main,
              '&:hover': {
                borderColor: customColors.periwinkle[600],
                backgroundColor: customColors.periwinkle[100],
              },
            }}
          >
            Back to Factors
          </Button>
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

      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Factors can be obtained from Factor Fusion, Treasure, or Online Co-op. Factors of level higher than 1 can also be obtained from the VIP Store.
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Total Factors: {extraFactors.length} | Factor Types: {Object.keys(factorGroups).length}
      </Typography>

      {/* Factor Types Grid */}
      {Object.entries(factorGroups).map(([factorName, factorList]) => (
        <Paper key={factorName} sx={{ mb: 4, p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: getTraitColor(factorList[0].trait) }}>
            {getTraitIcon(factorList[0].trait)} {factorName} - {factorList[0].trait}
          </Typography>
          
          <Grid container spacing={1}>
            {factorList.map(factor => (
              <Grid item xs={6} sm={4} md={3} lg={1.33} key={factor.id}>
                {renderFactorCard(factor)}
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default ExtraFactorsPage; 