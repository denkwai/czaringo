import React from 'react';
import useLocalStorageState from 'use-local-storage-state';

import './App.css';
import Field from './Field';

function App() {
  const [gameOver, setGameOver] = useLocalStorageState('isGameOver', { defaultValue: false });

  return (
    <div className="App">
      <header className="App-header">
        czaringo
      </header>

      <Field gameOver={gameOver} setGameOver={setGameOver} />
    </div>
  );
}

export default App;
