document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset-button");
    const rows = 10;
    const cols = 10;
    const minesCount = 15;
    let cells = [];
    let gameOver = false;

    function createBoard() {
        board.innerHTML = "";
        board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
        board.style.gridTemplateRows = `repeat(${rows}, 30px)`;
        gameOver = false;

        let minePositions = generateMines();
        cells = [];

        for (let r = 0; r < rows; r++) {
            cells[r] = [];
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (minePositions.has(`${r}-${c}`)) {
                    cell.dataset.mine = "true";
                } else {
                    cell.dataset.mine = "false";
                }

                cell.addEventListener("click", () => revealCell(r, c));
                cell.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    toggleFlag(cell);
                });

                board.appendChild(cell);
                cells[r][c] = cell;
            }
        }
    }

    function generateMines() {
        let positions = new Set();
        while (positions.size < minesCount) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            positions.add(`${r}-${c}`);
        }
        return positions;
    }

    function revealCell(r, c) {
        if (gameOver || !cells[r] || !cells[r][c] || cells[r][c].classList.contains("revealed")) return;

        let cell = cells[r][c];
        cell.classList.add("revealed");

        if (cell.dataset.mine === "true") {
            cell.classList.add("mine");
            alert("Game Over!");
            gameOver = true;
            revealAllMines();
            return;
        }

        let mineCount = countAdjacentMines(r, c);
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            revealSurroundingCells(r, c);
        }

        checkWin();
    }

    function countAdjacentMines(r, c) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = r + dr;
                let nc = c + dc;
                if (cells[nr] && cells[nr][nc] && cells[nr][nc].dataset.mine === "true") {
                    count++;
                }
            }
        }
        return count;
    }

    function revealSurroundingCells(r, c) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = r + dr;
                let nc = c + dc;
                revealCell(nr, nc);
            }
        }
    }

    function revealAllMines() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (cells[r][c].dataset.mine === "true") {
                    cells[r][c].classList.add("mine");
                }
            }
        }
    }

    function toggleFlag(cell) {
        if (cell.classList.contains("revealed")) return;
        if (cell.classList.contains("flag")) {
            cell.classList.remove("flag");
            cell.textContent = "";
        } else {
            cell.classList.add("flag");
            cell.textContent = "🚩";
        }
    }

    function checkWin() {
        let revealedCount = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (cells[r][c].classList.contains("revealed")) {
                    revealedCount++;
                }
            }
        }

        if (revealedCount === (rows * cols - minesCount)) {
            alert("Selamat! Anda Menang! 🎉");
            gameOver = true;
            revealAllMines();
        }
    }

    resetButton.addEventListener("click", createBoard);
    createBoard();
});
