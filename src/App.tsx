import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import type { Character } from './types/types';
import { characters as defaultCharacters } from './data/characters';
import Home from './pages/Home';
import CharacterPage from './pages/CharacterPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#00b0ff',
    },
  },
});

const STORAGE_KEY = 'bbrr-characters';

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characterData));
  }, [characterData]);

  const handleUpdateCharacter = (updatedCharacter: Character) => {
    setCharacterData((prev) =>
      prev.map((char) => (char.id === updatedCharacter.id ? updatedCharacter : char))
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
