// S H I P
const Ship = (size, type) => {
  const ship = {};

  ship.size = size;
  ship.hits = [];
  ship.type = type;

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

// P L A Y E R
const Player = (name, isHuman) => {
  const player = {};

  player.name = name;
  player.isHuman = isHuman;

  player.CPUplay = (board) => {
    let CPUOptions = board.reduce((array, cell, index) => {
      if (cell == null) {
        array.push(index);
      }
      return array;
    }, []);

    let randomChoice =
      CPUOptions[Math.floor(Math.random() * CPUOptions.length)];

    return randomChoice;
  };

  return player;
};

// G A M E B O A R D
const Gameboard = () => {
  const board = Array(100).fill(null);

  board.placeShip = (cell, ship, orientation) => {
    if (board.isPlaceable(cell, ship, orientation)) {
      if (orientation === "horizontal") {
        for (let i = 0; i < ship.size; i++) {
          board[cell + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          board[cell + i * 10] = ship;
        }
      }
    }
  };

  board.isPlaceable = (cell, ship, orientation) => {
    const notPlaceable = [
      9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90,
    ];

    if (board[cell] != null) {
      return false;
    }

    if (orientation === "horizontal") {
      let currentCell = cell;
      for (let i = 0; i <= ship.size - 2; i++) {
        if (
          notPlaceable.includes(currentCell) &&
          notPlaceable.includes(currentCell + 1)
        )
          return false;
        else currentCell = currentCell + 1;
      }
    } else {
      if (cell + (ship.size - 1) * 10 >= 100) return false;
    }
    return true;
  };

  board.receiveAttack = (cell) => {
    if (board[cell] === null) {
      board[cell] = "w";
      return false;
    } else if (board[cell] != "w") {
      let position = 0;
      let i = 1;
      const leftSizeofBoard = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
      // HORIZONTAL
      if (!leftSizeofBoard.includes(cell) && board[cell - i]) {
        while (
          board[cell - i] != undefined &&
          board[cell].type == board[cell - i].type
        ) {
          position++;
          i++;
        }
      } else if (cell >= 10 && board[cell - i * 10]) {
        while (
          board[cell - i * 10] != undefined &&
          board[cell].type == board[cell - i * 10].type
        ) {
          position++;
          i++;
        }
      }

      board[cell].hit(position);
      return true;
    }
  };

  board.areAllShipsSunk = () => {
    for (let i = 0; i <= 99; i++) {
      if (board[i] != null && board[i] != "w") {
        if (board[i].isSunk() == false) {
          return false;
        }
      }
    }
    return true;
  };

  return board;
};

export { Ship, Player, Gameboard };
