const columnHeights = [1, 1, 1, 1, 1, 1, 1];
let turn = 1;
let gameOver = false;

function isCell(player, col, row) {
    return document.getElementById(`c${col}r${row}`).style.backgroundColor === player;
}

function checkWin(player) {
    // Vertical
    for (let col = 1; col <= 7; col++) {
        for (let row = 1; row <= 3; row++) {
            if (isCell(player, col, row) && isCell(player, col, row + 1) && isCell(player, col, row + 2) && isCell(player, col, row + 3)) {
                return true;
            }
        }
    }

    // Horizontal
    for (let row = 1; row <= 6; row++) {
        for (let col = 1; col <= 4; col++) {
            if (isCell(player, col, row) && isCell(player, col + 1, row) && isCell(player, col + 2, row) && isCell(player, col + 3, row)) {
                return true;
            }
        }
    }

    // Diagonal up-right
    for (let col = 1; col <= 4; col++) {
        for (let row = 1; row <= 3; row++) {
            if (isCell(player, col, row) && isCell(player, col + 1, row + 1) && isCell(player, col + 2, row + 2) && isCell(player, col + 3, row + 3)) {
                return true;
            }
        }
    }

    // Diagonal down-right
    for (let col = 1; col <= 4; col++) {
        for (let row = 6; row >= 4; row--) {
            if (isCell(player, col, row) && isCell(player, col + 1, row - 1) && isCell(player, col + 2, row - 2) && isCell(player, col + 3, row - 3)) {
                return true;
            }
        }
    }

    return false;
}

function isDraw() {
    return columnHeights.every((height) => height > 6);
}

function endGame(message) {
    gameOver = true;
    setTimeout(() => {
        alert(message);
    }, 50);
}

document.querySelectorAll(".column").forEach((column) => {
    column.addEventListener("click", () => {
        if (gameOver) {
            return;
        }

        const colNumber = Number(column.id.replace("c", ""));
        const currentHeight = columnHeights[colNumber - 1];

        if (currentHeight > 6) {
            return;
        }

        const player = turn % 2 !== 0 ? "red" : "yellow";
        document.getElementById(`${column.id}r${currentHeight}`).style.backgroundColor = player;
        columnHeights[colNumber - 1] = currentHeight + 1;

        if (checkWin(player)) {
            endGame(`${player.toUpperCase()} wins`);
            return;
        }

        if (isDraw()) {
            endGame("It's a draw");
            return;
        }

        turn++;
        document.getElementById("whosturn").innerText = turn % 2 !== 0 ? "Red's Turn" : "Yellow's Turn";
    });
});

document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
});


