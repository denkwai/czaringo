import React from 'react';
import useLocalStorageState from 'use-local-storage-state';

import questions from './data/questions.json';
import Cell from './Cell';
import { createAnswerMap, createGrid, checkMapForWin } from './utils';
import { SIZE } from './constants';

import './Field.css';

function Field({gameOver = false, setGameOver = () => {}}) {
    const [answerMap, setAnswerMap, { isPersistent }] = useLocalStorageState('answerMap', { defaultValue: createAnswerMap(SIZE) });
    const [grid, setGrid] = useLocalStorageState('grid', { defaultValue: createGrid(questions, SIZE) })
    const rows = grid.map(createRow);

    function createRow(rowArray = [], rowIndex = 0) {
        return <div className='Row' key={`[${rowIndex}]`}>
            {rowArray.map((text, columnIndex) => {
                const isSelected = answerMap[rowIndex][columnIndex];
                return (<Cell key={`[${rowIndex},${columnIndex}]`}
                              text={text}
                              onClick={() => {(!isSelected && !gameOver) && selectAnswer(rowIndex, columnIndex)}}
                              onRemoveClick={() => {(isSelected && !gameOver) && deselectAnswer(rowIndex, columnIndex) }}
                              isSelected={isSelected} />)
            })}
        </div>
    };

    function selectAnswer(row = 0, column = 0) {
        const newAnswerMap = [...answerMap]

        newAnswerMap[row][column] = true;

        setAnswerMap(newAnswerMap);
    }

    function deselectAnswer(row = 0, column = 0) {
        const newAnswerMap = [...answerMap]

        newAnswerMap[row][column] = false;

        setAnswerMap(newAnswerMap);
    }

    function resetGame() {
        setGrid(createGrid(questions, SIZE));
        setAnswerMap(createAnswerMap(SIZE));
        setGameOver(false);
    }

    React.useEffect(() => {
        console.log(isPersistent);
        if (checkMapForWin(answerMap)) {
            setGameOver(true);

            if(window.confirm('Bingo! Do you want to play again?')) {
                resetGame()
            }
        }
    }, [answerMap, setGameOver])

    React.useEffect(() => {
        if (!gameOver) {
            resetGame()
        }
    }, [gameOver])

    return <main className='Field'>
        {rows}
    </main>
}

export default Field;