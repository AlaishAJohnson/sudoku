import React, { useState, useEffect } from 'react';
import SudokuBoard from './SudokuBoard';
import sudoku from 'sudoku';
import './SudokuGame.css';

const generateBoard = (level) => {
    const puzzle = sudoku.makepuzzle();
    const difficulty = { easy: 36, medium: 27, hard: 18 };

    const formattedBoard = Array(9)
        .fill(null)
        .map(() => Array(9).fill(0));

    puzzle.forEach((value, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        formattedBoard[row][col] = value === null ? 0 : value + 1;
    });

    const cellsToRemove = 81 - difficulty[level];
    let removed = 0;
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (formattedBoard[row][col] !== 0) {
            formattedBoard[row][col] = 0;
            removed++;
        }
    }

    return formattedBoard;
};

const SudokuGame = () => {
    const [level, setLevel] = useState(null);
    const [board, setBoard] = useState([]);

    useEffect(() => {
        if (level) {
            setBoard(generateBoard(level));
        }
    }, [level]);

    const handleCellChange = (e, row, col) => {
        const value = e.target.value;
        if (value === '' || (value >= 1 && value <= 9)) {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? (value === '' ? 0 : parseInt(value, 10)) : cell))
            );
            setBoard(newBoard);
        }
    };

    const handleNewGame = (selectedLevel) => {
        setLevel(selectedLevel);
    };

    return (
        <div className='sudoku-game'>
            <h1>Sudoku Game</h1>
            {!level && (
                <div className='difficulty-selector'>
                    <h2>Select Difficulty:</h2>
                    <button onClick={() => handleNewGame('easy')}>Easy</button>
                    <button onClick={() => handleNewGame('medium')}>Medium</button>
                    <button onClick={() => handleNewGame('hard')}>Hard</button>
                </div>
            )}
            {level && (
                <>
                    <SudokuBoard board={board} onCellChange={handleCellChange} />
                    <button onClick={() => handleNewGame(null)}>New Game</button>
                </>
            )}
        </div>
    );
};

export default SudokuGame;
