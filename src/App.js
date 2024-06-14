
import React, { useState } from 'react';
import './App.css';
import SudokuGame from './components/SudokuGame';

function App() {
  const [level, setLevel] = useState(null);

  console.log("Current level:", level);

  return (
    <div className="App">
     <header className="App-header">
        <h1>Sudoku Game</h1>
      </header>
      <main>
        <SudokuGame level={level} setLevel={setLevel} />
      </main>
    </div>
  );
}

export default App;
