import { prepareDOM } from "./render.js";
import { Ship, Player, Gameboard } from "./factories.js";

function prepareGame() {
  prepareDOM();

  const boardP1 = Gameboard();
  const boardCPU = Gameboard();

  const player1 = Player("Player 1", true);
  const CPU = Player("CPU", false);

  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(2);
  const patrolBoat = Ship(1);

  boardP1.placeShip(0, 2, carrier, "horizontal");
  boardP1.placeShip(5, 5, battleship, "vertical");
  boardP1.placeShip(5, 5, destroyer, "vertical");
  boardP1.placeShip(5, 5, submarine, "vertical");
  boardP1.placeShip(5, 5, patrolBoat, "vertical");

  //board.receiveAttack(2, 1);
}

prepareGame();
