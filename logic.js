// TODO: Sometimes, the win condition doesnt work, or fires too early
// TODO: Check for random ship allocated correctly

import {
  displayToPlaceDOM,
  prepareToggleButton,
  toggleOptions,
  prepareCellsListenersDOM,
  placeAllShipsDOM,
  receiveAttackDOM,
  toggleFreeze,
  displayTurn,
  showWinner,
  resetBoards,
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

    boardP2.placeShip(0, submarine, "Horizontal");

    //boardP2.placeShipsRandomly(boardP2, arrayShips);

    placeAllShipsDOM(boardP1);
  };

  const prepareShip = (cell, orientation) => {
    if (boardP1.isPlaceable(cell, arrayShips[0], orientation)) {
      const ship = arrayShips.shift();
      boardP1.placeShip(cell, ship, orientation);
      placeAllShipsDOM(boardP1); // This should update the ship, not all the board. But it works.

      if (arrayShips.length == 0) {
        toggleFreeze("P1");
        toggleFreeze("P2");

        toggleOptions();
        game.turn(player1);

        return;
        // TODO startGame();
      }
      displayToPlaceDOM(arrayShips[0]);
    } else {
      console.log(`Can't place ship there.`); //TODO: Something in DOM
    }
  };

  const turn = (player) => {
    if (player) {
      globalTurn = player;
      displayTurn(player);
    }
    return globalTurn;
  };

  const sendAttack = (cell) => {
    if (game.turn() == player1) {
      {
        if (boardP2[cell] === null) {
          boardP2[cell] = "w";
          receiveAttackDOM("P2", cell, "w");
        } else if (boardP2[cell].type) {
          boardP2.receiveAttack(cell);
          receiveAttackDOM("P2", cell);

          if (boardP2.areAllShipsSunk()) {
            showWinner(player1.name);
            toggleFreeze("P2");
            return; // TODO: Option to restart the game
          }
        }
        game.turn(player2);
        toggleFreeze("P2");
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
          showWinner(player2.name);
          return;
        }
      }
      game.turn(player1);
      toggleFreeze("P2");
    }, 500);
  };

  const reset = () => {
    arrayShips.push(carrier, battleship, destroyer, submarine, patrolBoat);

    for (let i = 0; i <= 4; i++) {
      arrayShips[i].hits = [];
    }

    boardP1.reset();
    boardP2.reset();

    game.turn(player1);

    resetBoards();
    toggleOptions();
    displayToPlaceDOM(arrayShips[0]);
  };

  return { prepare, prepareShip, turn, sendAttack, reset };
})();

toggleFreeze("P2");
prepareToggleButton();
game.prepare();
displayToPlaceDOM(arrayShips[0]);

export { game };
