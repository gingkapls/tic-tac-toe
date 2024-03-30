// let [m1, m2] = ["X", "O"];

const Gameboard = ((mark1, mark2) => {
  const [numRows, numCols] = [3, 3];

  const board = Array.from({ length: numRows }, () =>
    new Array(numCols).fill(null)
  );

  let currentTurn = mark1;

  const toggleTurn = () => {
    currentTurn = currentTurn === mark1 ? mark2 : mark1;
  };

  const getTurn = () => currentTurn;

  const isEmptyCell = ({ row, col }) => {
    if (board[row][col]) return false;

    return true;
  };

  const getBoard = () => board.forEach((row) => console.log(row));

  const resetBoard = () => {
    board.forEach((row) => row.fill(null));
    toggleTurn();
  };

  const isBoardFull = () => !board.flat().some((cell) => cell === null);

  // There is a row where there doesn't exists a cell that's not marked or it is not equal to the first cell
  const checkRowWin = () =>
    board.some((row) => !row.some((cell) => !cell || cell !== row[0]));

  const checkColWin = () => {
    let win;
    // TODO: implement column check
    for (let i = 0; i < numCols; ++i) {
      win = true;
      for (let j = 0; j < numRows; ++j) {
        if (board[0][i] === null) {
          win = false;
          break;
        }

        if (board[j][i] !== board[0][i]) win = false;
      }
      if (win) return win;
    }
  };

  const checkDiagonalWin = () => {
    let win = true;
    // Left diagonal
    for (let i = 0; i < numRows; ++i) {
      // if top left is null
      if (!board[0][0]) {
        win = false;
        break;
      }

      if (board[i][i] !== board[0][0]) {
        win = false;
        break;
      }
    }
    if (win) return win;

    win = true;
    for (let i = numRows - 1; i > 0; --i) {
      // if top right is null
      if (!board[0][numCols - 1]) {
        win = false;
        break;
      }

      if (board[i][numRows - i - 1] !== board[numRows - 1][numCols - 1]) {
        win = false;
        break;
      }
    }

    return win;
  };

  const checkWin = () => {
    // TODO: implement win check
    let win;
    // check if there is a row where all cells are equal to the first cell
    // win = checkColWin();
    win = checkRowWin() || checkColWin() || checkDiagonalWin();
    if (win) return { currentTurn, win };

    return false;
  };

  const placeMarker = ({ row, col }) => {
    if (!isEmptyCell({ row, col })) return "ERROR";

    console.log("");
    board[row][col] = currentTurn;
    getBoard();
    console.log(checkWin());
    toggleTurn();
    return true;
  };

  return {
    resetBoard,
    getBoard,
    placeMarker,
    getTurn,
    checkWin,
  };
})("X", "O");

// Row win tests
/* Gameboard.placeMarker({ row: 1, col: 0 }); // X
Gameboard.placeMarker({ row: 0, col: 0 }); // O
Gameboard.placeMarker({ row: 2, col: 0 }); // X
Gameboard.placeMarker({ row: 0, col: 1 }); // O
Gameboard.placeMarker({ row: 2, col: 1 }); // X
Gameboard.placeMarker({ row: 0, col: 2 }); // O
// Gameboard.resetBoard();
Gameboard.getBoard(); */

// Column win test
/* Gameboard.placeMarker({ row: 0, col: 1 }); // X
Gameboard.placeMarker({ row: 2, col: 0 }); // O
Gameboard.placeMarker({ row: 1, col: 1 }); // X
Gameboard.placeMarker({ row: 2, col: 2 }); // O
Gameboard.placeMarker({ row: 2, col: 1 }); // X */

// Diagonal win test
Gameboard.placeMarker({ row: 0, col: 0 }); // X
Gameboard.placeMarker({ row: 2, col: 0 }); // O
Gameboard.placeMarker({ row: 1, col: 1 }); // X
Gameboard.placeMarker({ row: 2, col: 1 }); // O
Gameboard.placeMarker({ row: 2, col: 2 }); // X
