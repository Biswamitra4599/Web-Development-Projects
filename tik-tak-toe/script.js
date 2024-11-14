// Selecting elements
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart');
const statusDisplay = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let board = ['', '', '', '', '', '', '', '', '']; // Game board state
let currentPlayer = 'X'; // Player X starts
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

// Function to handle cell click
function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return; // Prevent action if cell is filled or game is over
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer; // Add X or O to the cell
  cells[index].classList.add(currentPlayer);  // Add class to the cell for styling
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
}

// Function to check the winner
function checkWinner() {
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

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusDisplay.innerHTML = `${currentPlayer} wins!`;
      updateScore(currentPlayer);
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusDisplay.innerHTML = "It's a draw!";
  }
}

// Function to update the score
function updateScore(winner) {
  if (winner === 'X') {
    playerXScore++;
    scoreX.innerText = `Player X: ${playerXScore}`;
  } else if (winner === 'O') {
    playerOScore++;
    scoreO.innerText = `Player O: ${playerOScore}`;
  }
}

// Function to restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerHTML = '';
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');  // Remove X and O classes
    cell.textContent = '';  // Clear cell content
  });
}

// Attach event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Restart button click event
restartButton.addEventListener('click', () => {
  restartGame();
  statusDisplay.innerHTML = ''; // Clear any win/draw message
});
