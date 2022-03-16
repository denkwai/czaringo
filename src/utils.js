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

const checkMapForWin = (answerMap = []) => {
    const gridSize = answerMap.length;

    const gridRows = answerMap;
    const gridColumns = answerMap[0].map((col, i) => answerMap.map(row => row[i]));
    const gridDiagonal1 = answerMap.map((r, i) => r[i]);
    const gridDiagonal2 = answerMap.map((r, i) => r[gridSize - i - 1]);

    // Check rows for win
    if (gridRows.some(r => r.every(a => a))) {
        return true;
    }

    // Check columns for win
    if (gridColumns.some(r => r.every(a => a))) {
        return true;
    }

    // Check first diagonal (top-left-bottom-right)
    if (gridDiagonal1.every(a => a)) {
        return true;
    }

    // Check first diagonal (bottom-left-top-right)
    if (gridDiagonal2.every(a => a)) {
        return true;
    }
}

export {
    createGrid,
    createAnswerMap,
    checkMapForWin
}