document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const overlay = document.getElementById('overlay');
    const resultText = document.getElementById('resultText');
    const newGameBtn = document.getElementById('newGameBtn');

    let currentPlayer = 'X';
    let gameState = Array(9).fill('');

    const winningConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (gameState[index] !== '' || checkWinner()) return;

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            showOverlay(currentPlayer + ' wins!');
            return;
        }

        if (!gameState.includes('')) {
            showOverlay("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function showOverlay(message) {
        resultText.textContent = message;
        overlay.style.display = 'flex';
    }

    function resetGame() {
        gameState.fill('');
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        overlay.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    newGameBtn.addEventListener('click', resetGame);
});
