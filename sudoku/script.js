function generateSudoku() {
    let board = Array(9).fill().map(() => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.6) {
                let num = Math.floor(Math.random() * 9) + 1;
                board[i][j] = num;
            }
        }
    }
    return board;
}

let board = generateSudoku();

function createBoard() {
    board = generateSudoku();
    const boardElement = document.getElementById("sudokuBoard");
    boardElement.innerHTML = "";
    
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell !== 0 ? cell : "";
            if (cell === 0) {
                cellElement.contentEditable = "true";
            }
            boardElement.appendChild(cellElement);
        });
    });
}

function checkSolution() {
    const cells = document.querySelectorAll(".cell");
    let index = 0;
    let isValid = true;
    
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            let userValue = cells[index].textContent.trim();
            if (cell === 0 && (!userValue || isNaN(userValue) || userValue < 1 || userValue > 9)) {
                isValid = false;
            }
            index++;
        });
    });
    
    document.getElementById("result").textContent = isValid ? "Looks good!" : "There are mistakes.";
}

createBoard();