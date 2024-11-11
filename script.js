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
        container.innerHTML = ""; // Limpiar el tablero
        board = Array(9).fill(null); // Reiniciar el estado del tablero
        currentPlayer = "X"; // Reiniciar el turno al jugador humano
        modal.style.display = "none"; // Ocultar el modal
        viewMessageButton.style.display = "none"; // Ocultar botón de mensaje

        // Crear celdas del tablero
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
                showResultModal(`¡${currentPlayer} gana! 🎉`);
            } else if (isDraw()) {
                showResultModal("¡Es un empate! 🤝");
            } else {
                currentPlayer = "O"; // Turno de la IA
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
            showResultModal(`¡${currentPlayer} gana! 🎉`);
        } else if (isDraw()) {
            showResultModal("¡Es un empate! 🤝");
        } else {
            currentPlayer = "X"; // Turno del jugador humano
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
    function showResultModal(message) {
    resultMessage.textContent = message;
    modal.style.display = "flex"; // Mostrar el modal

    // Mostrar el botón "Ver mensaje" solo si el jugador humano gana
    if (message.includes("X gana")) {
        viewMessageButton.style.display = "inline-block";
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
        createBoard(); // Reiniciar el juego al cambiar dificultad
    });

    // Redirigir a mensaje.html al hacer clic en "Ver mensaje"
    viewMessageButton.addEventListener("click", () => {
        window.location.href = "mensaje.html";
    });

    // Reiniciar el juego al hacer clic en "Reiniciar"
    restartButton.addEventListener("click", function () {
        createBoard(); // Reiniciar el tablero
    });

    // Inicializar el tablero
    createBoard();
});
