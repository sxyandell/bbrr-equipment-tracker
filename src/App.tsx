import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, IconButton, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import type { Character, Factor } from './types/types';
import { characters as defaultCharacters } from './data/characters';
import { factors as defaultFactors } from './data/factors';
import { extraFactors as defaultExtraFactors } from './data/extraFactors';
import Home from './pages/Home';
import CharacterPage from './pages/CharacterPage';
import FactorsPage from './pages/FactorsPage';
import ExtraFactorsPage from './pages/ExtraFactorsPage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Custom color palette for use throughout the app
export const customColors = {
  walnut_brown: {
    main: '#594f3b',
    100: '#12100c', 200: '#232018', 300: '#352f23', 400: '#473f2f', 500: '#594f3b', 600: '#847658', 700: '#a89a7d', 800: '#c5bba8', 900: '#e2ddd4',
  },
  umber: {
    main: '#776258',
    100: '#181412', 200: '#302824', 300: '#483b35', 400: '#604f47', 500: '#776258', 600: '#998075', 700: '#b2a097', 800: '#ccc0ba', 900: '#e5dfdc',
  },
  chinese_violet: {
    main: '#896279',
    100: '#1b1318', 200: '#372730', 300: '#523a48', 400: '#6e4e60', 500: '#896279', 600: '#a47e94', 700: '#ba9eaf', 800: '#d1bfc9', 900: '#e8dfe4',
  },
  african_violet: {
    main: '#9c7ca5',
    100: '#201823', 200: '#402f45', 300: '#614768', 400: '#815e8a', 500: '#9c7ca5', 600: '#b197b8', 700: '#c4b1ca', 800: '#d8cbdb', 900: '#ebe5ed',
  },
  periwinkle: {
    main: '#adb2d3',
    100: '#1b1e32', 200: '#363c63', 300: '#505a95', 400: '#7a83b8', 500: '#adb2d3', 600: '#bdc1db', 700: '#cdd0e4', 800: '#dee0ed', 900: '#eeeff6',
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: customColors.periwinkle.main,
    },
    secondary: {
      main: customColors.walnut_brown.main,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: customColors.periwinkle.main,
    },
    secondary: {
      main: customColors.walnut_brown.main,
    },
  },
});

const STORAGE_KEY = 'bbrr-characters';
const FACTORS_KEY = 'bbrr-factors';
const EXTRA_FACTORS_KEY = 'bbrr-extra-factors';
const THEME_KEY = 'bbrr-theme-mode';

function App() {
  const [characterData, setCharacterData] = useState<Character[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultCharacters;
      }
    }
    return defaultCharacters;
  });
  const [factorsData, setFactorsData] = useState<Factor[]>(() => {
    const stored = localStorage.getItem(FACTORS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultFactors;
      }
    }
    return defaultFactors;
  });
  const [extraFactorsData, setExtraFactorsData] = useState<Factor[]>(() => {
    const stored = localStorage.getItem(EXTRA_FACTORS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultExtraFactors;
      }
    }
    return defaultExtraFactors;
  });
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characterData));
  }, [characterData]);

  useEffect(() => {
    localStorage.setItem(FACTORS_KEY, JSON.stringify(factorsData));
  }, [factorsData]);

  useEffect(() => {
    localStorage.removeItem(EXTRA_FACTORS_KEY);
    console.log('Cleared extra factors localStorage, regenerating data...');
    setExtraFactorsData(defaultExtraFactors);
  }, []);

  useEffect(() => {
    localStorage.removeItem(FACTORS_KEY);
    console.log('Cleared factors localStorage, regenerating data...');
    setFactorsData(defaultFactors);
  }, []);

  useEffect(() => {
    localStorage.setItem(EXTRA_FACTORS_KEY, JSON.stringify(extraFactorsData));
  }, [extraFactorsData]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeMode);
  }, [themeMode]);

  const handleUpdateCharacter = (updatedCharacter: Character) => {
    setCharacterData((prev) =>
      prev.map((char) => (char.id === updatedCharacter.id ? updatedCharacter : char))
    );
  };

  const handleUpdateFactors = (updatedFactors: Factor[]) => {
    setFactorsData(updatedFactors);
  };

  const handleUpdateExtraFactors = (updatedExtraFactors: Factor[]) => {
    setExtraFactorsData(updatedExtraFactors);
  };

  // Debug logging to check what's being passed
  console.log('App - factorsData length:', factorsData.length);
  console.log('App - factorsData types:', [...new Set(factorsData.map(f => f.name))]);
  console.log('App - defaultFactors length:', defaultFactors.length);
  console.log('App - defaultFactors types:', [...new Set(defaultFactors.map(f => f.name))]);

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', top: 12, right: 16, zIndex: 2000 }}>
        <IconButton onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')} color="inherit">
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Router>
        <Routes>
          <Route path="/" element={<Home characters={characterData} />} />
          <Route
            path="/character/:id"
            element={
              <CharacterPage
                characters={characterData}
                onUpdateCharacter={handleUpdateCharacter}
              />
            }
          />
          <Route
            path="/factors"
            element={
              <FactorsPage
                factors={factorsData}
                onUpdateFactors={handleUpdateFactors}
              />
            }
          />
          <Route
            path="/extra-factors"
            element={
              <ExtraFactorsPage
                extraFactors={extraFactorsData}
                onUpdateExtraFactors={handleUpdateExtraFactors}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
