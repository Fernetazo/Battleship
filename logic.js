import { prepareDOM, receiveAttackDOM, freeze, unfreeze } from "./render.js";
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

const game = (() => {
  const prepare = () => {
    /*boardP1.placeShip(0, carrier, "horizontal");
    boardP1.placeShip(9, battleship, "vertical");
    boardP1.placeShip(31, destroyer, "vertical");
    boardP1.placeShip(73, submarine, "horizontal");*/
    boardP1.placeShip(98, patrolBoat, "vertical");
    /*
    boardP2.placeShip(0, carrier, "horizontal");
    boardP2.placeShip(15, battleship, "horizontal");
    boardP2.placeShip(34, destroyer, "vertical");*/
    boardP2.placeShip(73, submarine, "horizontal");
    boardP2.placeShip(98, patrolBoat, "vertical");

    prepareDOM(boardP1);
  };

  const turn = (player) => {
    if (player) globalTurn = player;
    return globalTurn;
  };

  const sendAttack = (cell) => {
    if (game.turn() == "player1") {
      {
        if (boardP2.receiveAttack(cell)) {
          boardP2.receiveAttack(cell);
          receiveAttackDOM("P2", cell);
          if (boardP2.areAllShipsSunk()) {
            console.log("Player 1 WINS!!!"); //TODO: Ship manual placement
            freeze();
          }
        } else receiveAttackDOM("P2", cell, "w");

        game.turn("CPU");
        freeze();
      }
    }
    setTimeout(() => {
      let CPUPlay = player2.CPUplay(boardP1);
      if (boardP1.receiveAttack(CPUPlay)) {
        boardP1.receiveAttack(CPUPlay);
        receiveAttackDOM("P1", CPUPlay);
        if (boardP1.areAllShipsSunk()) {
          console.log("Player 2 WINS!!!");
          return;
        }
      } else receiveAttackDOM("P1", CPUPlay, "w");
      game.turn("player1");
      unfreeze();
    }, 500);
  };

  return { prepare, turn, sendAttack };
})();

game.prepare();
game.turn("player1");
export { game };
