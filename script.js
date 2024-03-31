// let [m1, m2] = ["X", "O"];

const Gameboard = ((mark1, mark2) => {
  const [numRows, numCols] = [3, 3];

  let currentTurn = mark1;
  let isEnded = false;
  let isWon = false;
  let isFull = false;

  const board = Array.from({ length: numRows }, () =>
    new Array(numCols).fill(null)
  );

  const toggleTurn = () => {
    currentTurn = currentTurn === mark1 ? mark2 : mark1;
  };

  const getTurn = () => currentTurn;
  const getIsEnded = () => isEnded;
  const getIsWon = () => isWon;
  const getIsFull = () => isFull;

  const isEmptyCell = ({ row, col }) => {
    if (board[row][col]) return false;

    return true;
  };

  const getBoard = () => board;

  const resetBoard = () => {
    board.forEach((row) => row.fill(null));
    isEnded = false;
    isFull = false;
    isWon = false;
    toggleTurn();
  };

  const checkBoardFull = () =>
    isFull || !board.flat().some((cell) => cell === null);

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

      if (board[i][numRows - i - 1] !== board[0][numCols - 1]) {
        win = false;
        break;
      }
    }

    return win;
  };

  const checkWin = () => {
    if (isWon) return isWon;

    isWon = checkRowWin() || checkColWin() || checkDiagonalWin();
    if (isWon) return { currentTurn, isWon };
    return false;
  };

  const placeMarker = ({ row, col }) => {
    if (!isEmptyCell({ row, col })) return false;
    if (isWon) return false;

    board[row][col] = currentTurn;
    getBoard();
    if (checkWin().isWon) {
      console.log(`Game has ended ${currentTurn} has won`);
      isWon = true;
      isEnded = true;
      return true;
    }

    if (checkBoardFull()) {
      isEnded = true;
      isWon = false;
      console.log(`No one won`);
    }

    toggleTurn();
    return true;
  };

  return {
    resetBoard,
    getBoard,
    placeMarker,
    isEmptyCell,
    getTurn,
    getIsWon,
    getIsFull,
    getIsEnded,
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
/* Gameboard.placeMarker({ row: 0, col: 0 }); // X
Gameboard.placeMarker({ row: 2, col: 0 }); // O
Gameboard.placeMarker({ row: 1, col: 1 }); // X
Gameboard.placeMarker({ row: 2, col: 1 }); // O
Gameboard.placeMarker({ row: 2, col: 2 }); // X */

const boardElement = document.querySelector("#board");
const resultElement = document.querySelector("#result");

const renderToDom = ((boardEl, resultEl) => {
  const initialRender = () => {
    const board = Gameboard.getBoard();
    board.forEach((row, i) => {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("row");

      row.forEach((cell, j) => {
        const cellElem = document.createElement("div");
        cellElem.classList.add("cell");
        cellElem.dataset.row = i;
        cellElem.dataset.col = j;
        rowContainer.append(cellElem);
      });
      boardEl.append(rowContainer);
    });
  };

  boardEl.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    if (event.target.classList.contains("row")) return;

    const { row, col } = {
      row: event.target.dataset.row,
      col: event.target.dataset.col,
    };

    if (Gameboard.isEmptyCell({ row, col }) && !Gameboard.getIsWon()) {
      event.target.textContent = Gameboard.getTurn();
      Gameboard.placeMarker({ row, col });
    }
  });

  return {
    initialRender,
  };
})(boardElement, resultElement);

renderToDom.initialRender();
