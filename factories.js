// S H I P
const Ship = (size, type) => {
  const ship = {};

  ship.size = size;
  ship.hits = [];
  ship.type = type;
  ship.locations = [];

  ship.hit = (position) => {
    if (!ship.hits.includes(position)) {
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
        // Checks for cell with ship that doesn't have been shot
      } else if (
        cell != null &&
        cell != "w" &&
        !cell.locations.includes(index)
      ) {
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

  board.reset = () => {
    for (let i = 0; i < 100; i++) {
      board[i] = null;
    }
  };

  board.placeShip = (cell, ship, orientation) => {
    if (orientation === "Horizontal") {
      for (let i = 0; i < ship.size; i++) {
        board[cell + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        board[cell + i * 10] = ship;
      }
    }
  };

  board.isPlaceable = (cell, ship, orientation) => {
    // Check selected cell
    if (board[cell] != null) {
      return false;
    }

    // HORIZONTAL
    if (orientation === "Horizontal") {
      // Check out of border (left bottom cell)
      if (cell + ship.size - 1 >= 100) return false;

      // Check out of border (right side)
      const notPlaceable = [
        9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90,
      ];
      let currentCell = cell;
      for (let i = 0; i <= ship.size - 2; i++) {
        if (
          notPlaceable.includes(currentCell) &&
          notPlaceable.includes(currentCell + 1)
        )
          return false;
        else currentCell += 1;
      }

      // Check near ships
      const leftWall = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
      const rightWall = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
      let iPlus = 0;
      let iLimit = 0;

      if (leftWall.includes(cell)) {
        iPlus = 1;
      }

      if (rightWall.includes(cell + ship.size - 1)) {
        iLimit = -1;
      }

      for (let j = -10; j <= 10; j += 10) {
        for (let i = -1 + iPlus; i <= ship.size + iLimit; i++) {
          if (board[cell + j + i] != null) return false;
        }
      }

      // VERTICAL
    } else {
      // Check out of border (bottom)
      if (cell + (ship.size - 1) * 10 >= 100) return false;

      // Check near ships
      const leftWall = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
      const rightWall = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
      let jPlus = 0;
      let jLimit = 0;

      if (leftWall.includes(cell)) {
        jPlus = 1;
      }

      if (rightWall.includes(cell)) {
        jLimit = -1;
      }
      for (let j = -1 + jPlus; j <= 1 + jLimit; j++) {
        for (let i = -10; i <= ship.size * 10; i += 10) {
          if (board[cell + j + i] != null) return false;
        }
      }
    }

    // Everything is alright! Can place the ship
    return true;
  };

  board.placeShipsRandomly = (board, arrayShips) => {
    const orientation = ["Vertical", "Horizontal"];
    let randomOri = Math.floor(Math.random() * 2);
    let randomCell = Math.floor(Math.random() * 100);

    let i = 0;
    while (i <= 4) {
      if (
        board.isPlaceable(randomCell, arrayShips[i], orientation[randomOri])
      ) {
        board.placeShip(randomCell, arrayShips[i], orientation[randomOri]);
        i++;
      } else {
        randomOri = Math.floor(Math.random() * 2);
        randomCell = Math.floor(Math.random() * 100);
      }
    }
  };

  board.receiveAttack = (cell) => {
    let position = 0;
    let i = 1;
    const leftSideBoard = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

    // HORIZONTAL
    if (
      !leftSideBoard.includes(cell) &&
      board[cell - i] != null &&
      board[cell - i] != "w"
    ) {
      while (
        board[cell - i] != undefined &&
        board[cell].type == board[cell - i].type
      ) {
        position++;
        i++;
      }
      // VERTICAL
    } else if (
      cell >= 10 &&
      board[cell - i * 10] != null &&
      board[cell - i * 10] != "w"
    ) {
      while (
        board[cell - i * 10] != undefined &&
        board[cell].type == board[cell - i * 10].type
      ) {
        position++;
        i++;
      }
    }
    board[cell].hit(position);
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

  board.isShot = (cell) => {};

  return board;
};

export { Ship, Player, Gameboard };
