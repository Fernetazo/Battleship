const Ship = (length) => {
  const ship = {};

  ship.length = Array(length).fill(0);

  ship.hit = (position) => {
    if (ship.length[position] === 0) {
      return (ship.length[position] = 1);
    }
  };

  ship.isSunk = () => {
    // If at least a 0 is found, is not sunk
    return !ship.length.includes(0);
  };

  return ship;
};

const P1 = Ship(5);
