import { render } from "./render.js";

const Ship = (size) => {
  const ship = {};
  ship.size = size;
  ship.hits = [];

  ship.hit = (position) => {
    if (ship.hits[position] == null) {
      ship.hits.push(position);
    }
  };

  ship.isSunk = () => {
    return ship.size === ship.hits.length;
  };

  return ship;
};

const Player = (name, isHuman) => {
  const player = {};

  player.name = name;
  player.isHuman = isHuman;

  // TO DO here: use modern functions (reduce, filter, etc.)
  player.CPUplay = () => {
    let CPUOptions = [];

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (board[i][j] == null) CPUOptions.push({ i, j });
      }
    }
    let randomChoice =
      CPUOptions[Math.floor(Math.random() * CPUOptions.length)];

    // Returns {i, j} object
    return randomChoice;
  };

  return player;
};

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board.push(Array(10).fill(null));
  }

  board.placeShip = (row, column, ship, orientation) => {
    if (board.isPlaceable(row, column, ship, orientation)) {
      if (orientation === "horizontal") {
        for (let i = 0; i < ship.size; i++) {
          board[row][column + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          board[row + i][column] = ship;
        }
      }
    }
  };

  board.isPlaceable = (row, column, ship, orientation) => {
    if (orientation === "horizontal") {
      if (column + ship.size - 1 > 9) return false;
      for (let i = 0; i < ship.size; i++) {
        if (board[row][column + i] != null) return false;
      }
    } else {
      if (row + ship.size - 1 > 9) return false;
      for (let i = 0; i < ship.size; i++) {
        if (board[row + i][column] != null) {
          return false;
        }
      }
    }
    return true;
  };

  board.receiveAttack = (row, column) => {
    if (board[row][column] === null) {
      board[row][column] = "w";
    } else {
      let position = 0;
      // is horizontal
      if (column > 0 && board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && board[row][column - i]) {
          position++;
          i++;
        }
      }
      // is vertical
      else if (row > 0 && board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && board[row - i][column]) {
          position++;
          i++;
        }
      }
      board[row][column].hit(position);
    }
    console.table(board);
    return true;
  };

  board.areAllShipsSunk = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] != null && board[i][j] != "w") {
          if (board[i][j].isSunk() == false) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return board;
};

const board = Gameboard();

const carrier = Ship(5);
const boat = Ship(2);

board.placeShip(0, 2, carrier, "horizontal");
board.placeShip(5, 5, boat, "vertical");

board.receiveAttack(2, 1);

board.receiveAttack(0, 2);
board.receiveAttack(0, 3);
board.receiveAttack(0, 4);
board.receiveAttack(0, 5);
board.receiveAttack(0, 6);

board.receiveAttack(5, 5);
board.receiveAttack(6, 5);
console.log(board.areAllShipsSunk());

const CPU = Player("CPU", false);

render();
