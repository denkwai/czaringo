import React from 'react';

import questions from './data/questions.json';
import Cell from './Cell';
import { createAnswerMap, createGrid, checkMapForWin } from './utils';
import { SIZE } from './constants';

import './Field.css';

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
    }

    function resetGame() {
        setGrid(createGrid(questions, SIZE));
        setAnswerMap(createAnswerMap(SIZE));
    }

    React.useEffect(() => {
        if (checkMapForWin(answerMap)) {
            if(window.confirm('Bingo! Do you want to play again?')) {
                resetGame()
            }
        }
    }, [answerMap])

    return <main className='Field'>
        {rows}
    </main>
}

export default Field;