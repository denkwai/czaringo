import React from 'react';

import questions from './data/questions.json';
import Cell from './Cell';

import './Field.css';

const SIZE = 5;

const createGrid = (qs = [], size = 5) => {
    const q = [...qs]; // Duplicate input questions
    let g = []; // Create an empty array that will host mapping of field.

    for (let i = 0; i < size; i++) {
        g[i] = [];

        for (let j = 0; j < size; j++) {
            const phrase = q.splice(Math.floor(Math.random()*q.length),1)
            g[i][j] = phrase;
        }
    }

    return g;
}

const createAnswerMap = (size = 5) => {
    let m = []; // Create an empty array that will host mapping of field.

    for (let i = 0; i < size; i++) {
        m[i] = [];

        for (let j = 0; j < size; j++) {
            m[i][j] = false;
        }
    }

    return m;
}

const checkGridForWin = (grid = []) => {
    const gridSize = grid.length;
    const gridRow = grid[row];
    const gridColumn = grid.map(r => r[column]);
    const gridDiagonal1 = grid.map((r, i) => r[i]);
    const gridDiagonal2 = grid.map((r, i) => r[gridSize - i - 1]);

    console.log(gridRow, gridColumn, gridDiagonal1, gridDiagonal2);

    // Check row for win
    if (gridRow.every(a => a)) {
        return true;
    }

    // Check column for win
    if (gridColumn.every(a => a)) {
        return true;
    }

    // Check first diagonal (top-left-bottom-right)
    if (row === column && gridDiagonal1.every(a => a)) {
        return true;
    }

    // Check first diagonal (bottom-left-top-right)
    if (row + column === gridSize + 1 && gridDiagonal2.every(a => a)) {
        return true;
    }
}

function Field() {
    const [answerMap, setAnswerMap] = React.useState(createAnswerMap(SIZE));
    const [grid, setGrid] = React.useState(createGrid(questions, SIZE))
    const rows = grid.map(createRow);

    function createRow(rowArray = [], rowIndex = 0) {
        return <div className='Row' key={`[${rowIndex}]`}>
            {rowArray.map((text, columnIndex) => {
                const isSelected = answerMap[rowIndex][columnIndex];
                return (<Cell key={`[${rowIndex},${columnIndex}]`}
                              text={text}
                              onClick={() => {!isSelected && selectAnswer(rowIndex, columnIndex)}}
                              isSelected={isSelected} />)
            })}
        </div>
    };

    function selectAnswer(row = 0, column = 0) {
        const newAnswerMap = [...answerMap]

        newAnswerMap[row][column] = true;

        setAnswerMap(newAnswerMap);

        if (checkGridForWin(newAnswerMap, row, column)) {
            alert('Bingo!');
        }
    }

    return <main className='Field'>
        {rows}
    </main>
}

export default Field;