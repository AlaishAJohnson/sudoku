import React from 'react'
import './SudokuBoard.css'

const SudokuBoard = ({board, onCellChange}) => {
    return ( 
        <div className='sudoku-board'>
            {board.map((row, i) => (
                <div key={i} className='sudoku-row'>
                    {row.map((cell, j) => (
                        <input 
                        key={j} 
                        type='text' 
                        maxLength={1} 
                        value={cell === 0 ? '' : cell} 
                        onChange={(e) => onCellChange(e, i, j)} 
                        className='sudoku-cell' 
                        readOnly={cell !== 0}
                        />
                    ))}
                </div>
            ))}
        </div>
     );
}
 
export default SudokuBoard;