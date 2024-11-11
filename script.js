document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("tic-tac-toe");
    const modal = document.getElementById("resultModal");
    const resultMessage = document.getElementById("resultMessage");
    const viewMessageButton = document.getElementById("viewMessageButton");
    const restartButton = document.getElementById("restartButton");
    const difficultySelect = document.getElementById("difficultySelect");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let difficulty = "easy"; // Nivel de dificultad por defecto

    // Crear el tablero
    function createBoard() {
        container.innerHTML = "";
        board = Array(9).fill(null);
        currentPlayer = "X";
        modal.style.display = "none"; // Cerrar el modal si está abierto
        viewMessageButton.style.display = "none"; // Ocultar el botón "Ver mensaje"

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            container.appendChild(cell);
        }
    }

    // Manejar clic en las celdas
    function handleCellClick(event) {
        const index = parseInt(event.target.dataset.index, 10);

        if (board[index] === null && currentPlayer === "X") {
            makeMove(index, currentPlayer);

            if (checkWin(currentPlayer)) {
                showResultModal(`¡${currentPlayer} gana! 🎉`, currentPlayer === "X");
            } else if (isDraw()) {
                showResultModal("¡Es un empate! 🤝", false);
            } else {
                currentPlayer = "O"; // Cambiar a la IA
                setTimeout(aiMove, 500);
            }
        }
    }

    // Movimiento de la IA
    function aiMove() {
        let move;
        if (difficulty === "easy") {
            move = findRandomMove();
        } else if (difficulty === "medium") {
            move = Math.random() > 0.5 ? findBestMove() : findRandomMove();
        } else {
            move = findBestMove();
        }
        makeMove(move, currentPlayer);

        if (checkWin(currentPlayer)) {
            showResultModal(`¡${currentPlayer} gana! 🎉`, false); // Gana la IA
        } else if (isDraw()) {
            showResultModal("¡Es un empate! 🤝", false);
        } else {
            currentPlayer = "X"; // Cambiar de nuevo al jugador humano
        }
    }

    // Realizar movimiento
    function makeMove(index, player) {
        board[index] = player;
        const cell = container.children[index];
        cell.textContent = player;
        cell.classList.add(player === "X" ? "x" : "o");
    }

    // Mostrar modal con el resultado
    function showResultModal(message, isWin) {
        resultMessage.textContent = message;
        modal.style.display = "flex"; // Mostrar el modal

        if (isWin && currentPlayer === "X") {
            viewMessageButton.style.display = "inline-block"; // Mostrar botón "Ver mensaje"
        } else {
            viewMessageButton.style.display = "none";
        }
    }

    // Verificar empate
    function isDraw() {
        return board.every(cell => cell !== null);
    }

    // Verificar ganador
    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === player)
        );
    }

    // Movimiento aleatorio (Fácil)
    function findRandomMove() {
        const availableMoves = board
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Encontrar el mejor movimiento (Difícil)
    function findBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = "O"; // Simula el movimiento de la IA
                let score = minimax(board, 0, false);
                board[i] = null; // Revierte el movimiento
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    // Algoritmo Minimax (Difícil)
    function minimax(board, depth, isMaximizing) {
        if (checkWin("O")) return 10 - depth;
        if (checkWin("X")) return depth - 10;
        if (isDraw()) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Cambiar nivel de dificultad
    difficultySelect.addEventListener("change", function () {
        difficulty = difficultySelect.value;
        createBoard();
    });

    // Redirigir a mensaje.html al hacer clic en "Ver mensaje"
    viewMessageButton.addEventListener("click", () => {
        window.location.href = "mensaje.html"; // Redirige a la página
    });

    // Evento para reiniciar el juego desde el modal
    restartButton.addEventListener("click", function () {
        modal.style.display = "none"; // Cerrar el modal
        createBoard(); // Reiniciar el tablero
    });

    // Iniciar tablero
    createBoard();
});
