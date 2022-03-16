import React from 'react';

import './App.css';
import Field from './Field';

function App() {
  const [gameOver, setGameOver] = React.useState(false);

  return (
    <div className="App">
      <header className="App-header">
        czaringo

        {gameOver && (
          <button className="ResetGameButton" onClick={() => { setGameOver(false) }}>🔃 new game</button>
        )}
      </header>

      <Field gameOver={gameOver} setGameOver={setGameOver} />
    </div>
  );
}

export default App;
