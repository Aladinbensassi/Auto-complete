// src/App.tsx
import React from 'react';
import AutocompleteTags from './components/AutocompleteTags/AutocompleteTags';
import './App.css'

const App: React.FC = () => {
  return (
    <>
      <h1>Autocomplete:</h1>
      <AutocompleteTags />
    </>
  );
};

export default App;
