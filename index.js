const Ship = (length) => {
  const ship = {};
  ship.length = length;
  ship.hits = [];

  ship.hit = (position) => {
    if (ship.hits[position] == null) {
      ship.hits.push(position);
    }
  };

  ship.isSunk = () => {
    return ship.length === ship.hits.length;
  };

  return ship;
};

const P1 = Ship(5);

const Gameboard = () => {
  const gameboard = [];
  for (let i = 0; i < 10; i++) {
    gameboard.push(Array(10).fill(0));
  }

  gameboard.placeHorizontal = (x, y, ship) => {
    for (let i = 0; i < ship.length; i++) {
      gameboard[x][y + i] = ship;
    }
  };

  gameboard.receiveAttack = (row, column) => {
    if (gameboard[row][column] === 0) {
      gameboard[row][column] = "X";
    } else {
      let position = 0;
      // is horizontal
      if (column > 0 && gameboard[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && gameboard[row][column - i]) {
          position++;
          i++;
        }
      }
      // is vertical
      else if (row > 0 && gameboard[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && gameboard[row - i][column]) {
          position++;
          i++;
        }
      }
      gameboard[row][column].hit(position);
    }
    console.table(gameboard);
  };
  return gameboard;
};

const gameboard = Gameboard();

const carrier = Ship(5);
const x = 2;
const y = 2;
const shipLength = 5;
gameboard.placeHorizontal(x, y, carrier);
gameboard.receiveAttack(2, 1);
