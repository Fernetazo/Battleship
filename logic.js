import { prepareDOM } from "./render.js";
import { Ship, Player, Gameboard } from "./factories.js";

function prepareGame() {
  prepareDOM();

  const boardP1 = Gameboard();
  const boardP2 = Gameboard();

  const player1 = Player("Player 1", true);
  const player2 = Player("CPU", false);

  const carrier = Ship(5, "carrier");
  const battleship = Ship(4, "battleship");
  const destroyer = Ship(3, "destroyer");
  const submarine = Ship(2, "submarine");
  const patrolBoat = Ship(1, "patrolBoat");

  boardP1.placeShip(0, carrier, "horizontal");
  boardP1.placeShip(9, battleship, "vertical");
  boardP1.placeShip(31, destroyer, "vertical");
  boardP1.placeShip(73, submarine, "horizontal");
  boardP1.placeShip(98, patrolBoat, "vertical");

  boardP2.placeShip(0, carrier, "horizontal");
  boardP2.placeShip(15, battleship, "horizontal");
  boardP2.placeShip(34, destroyer, "vertical");
  boardP2.placeShip(73, submarine, "horizontal");
  boardP2.placeShip(98, patrolBoat, "vertical");

  boardP1.receiveAttack(98);
  boardP1.receiveAttack(73);
  boardP1.receiveAttack(74);
  console.log(player2.CPUplay(boardP1));
}

prepareGame();
