import {
  prepareCellsListenersDOM,
  placeAllShipsDOM,
  removeListeners,
  receiveAttackDOM,
  freeze,
  unfreeze,
} from "./render.js";
import { Ship, Player, Gameboard } from "./factories.js";

let globalTurn = null;

const boardP1 = Gameboard();
const boardP2 = Gameboard();

const player1 = Player("Player 1", true);
const player2 = Player("CPU", false);

const carrier = Ship(5, "carrier");
const battleship = Ship(4, "battleship");
const destroyer = Ship(3, "destroyer");
const submarine = Ship(2, "submarine");
const patrolBoat = Ship(1, "patrolBoat");

const arrayShips = [carrier, battleship, destroyer, submarine, patrolBoat];

const game = (() => {
  const prepare = () => {
    prepareCellsListenersDOM();

    boardP2.placeShip(0, carrier, "horizontal");
    /*boardP2.placeShip(15, battleship, "horizontal");
    boardP2.placeShip(86, battleship, "horizontal");
    boardP2.placeShip(97, submarine, "horizontal");*/
    boardP2.placeShip(99, patrolBoat, "vertical");

    placeAllShipsDOM(boardP1);
  };

  const prepareShip = (cell, orientation) => {
    //TODO: check for true isplaceable (watch out bottom line, and other cells with ships)
    if (boardP1.isPlaceable(cell, arrayShips[0], orientation)) {
      const ship = arrayShips.shift();
      boardP1.placeShip(cell, ship, orientation);
      placeAllShipsDOM(boardP1); // This should update the ship, not all the board
      if (arrayShips.length == 0) {
        removeListeners();
        unfreeze();
        console.log("Game starto!");
        //TODO startGame();
      }
    } else {
      console.log(`Can't place ship there.`);
    }
  };

  const turn = (player) => {
    if (player) globalTurn = player;
    return globalTurn;
  };

  const sendAttack = (cell) => {
    if (game.turn() == "player1") {
      {
        if (boardP2[cell] === null) {
          boardP2[cell] = "w";
          receiveAttackDOM("P2", cell, "w");
        } else if (boardP2[cell].type) {
          boardP2.receiveAttack(cell);
          receiveAttackDOM("P2", cell);

          if (boardP2.areAllShipsSunk()) {
            console.log("Player 1 WINS!!!");
            freeze();
          }
        }
        game.turn("CPU");
        freeze();
      }
    }
    setTimeout(() => {
      let CPUPlay = player2.CPUplay(boardP1);

      if (boardP1[CPUPlay] === null) {
        boardP1[CPUPlay] = "w";
        receiveAttackDOM("P1", CPUPlay, "w");
      } else if (boardP1[CPUPlay].type) {
        boardP1.receiveAttack(CPUPlay);
        receiveAttackDOM("P1", CPUPlay);
        if (boardP1.areAllShipsSunk()) {
          console.log("Player 2 WINS!!!");
          return;
        }
      }
      game.turn("player1");
      unfreeze();
    }, 500);
  };

  return { prepare, prepareShip, turn, sendAttack };
})();

//game.placeShips();
game.prepare();
game.turn("player1");
export { game };
