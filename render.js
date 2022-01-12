import { game } from "./logic.js";

function prepareCellsListenersDOM() {
  const grid = document.getElementsByClassName("gridContainer");
  freeze(); // TODO: Verify
  for (let i = 0; i <= 99; i++) {
    const cell = document.createElement("div");
    const cell2 = document.createElement("div");
    cell.classList.add("cell");
    cell2.classList.add("cell");
    cell.addEventListener("click", placeShipDOM);
    cell2.addEventListener("click", clickCell);
    grid[0].appendChild(cell);
    grid[1].appendChild(cell2);
  }
}

function displayToPlaceDOM(ship) {
  const display = document.querySelector(".display");
  display.textContent = `You have to place a ${ship.type}`;
}

function placeShipDOM(e) {
  const cell = e.target;
  const grid = Array.from(cell.parentNode.children);
  const orientation = "vertical"; //Should add a DOM button for user select mode, vertical or horizontal
  game.prepareShip(grid.indexOf(cell), orientation);
}

function clickCell(e) {
  const cell = e.target;
  const grid = Array.from(cell.parentNode.children);

  // TODO: This should be in logic part
  if (cell.classList[1] == "unknown") {
    game.sendAttack(grid.indexOf(cell));
  }
}

function placeAllShipsDOM(board) {
  const grid = document.getElementsByClassName("gridContainer");

  let cells = grid[0].children;
  for (let i = 0; i <= 99; i++) {
    if (board[i] && board[i].type) {
      cells[i].classList.add(board[i].type);
    } else if (board[i] == null) {
      cells[i].classList.add("water");
    }
  }

  cells = grid[1].children;
  Array.from(cells).forEach((e) => e.classList.add("unknown"));
}

function setTurn(turn) {
  let display = document.querySelector(".display");
  display.textContent = `It's the turn of ${turn}`;
}

function receiveAttackDOM(player, cell, water) {
  const grid = document.querySelector(`.gridContainer.${player}`);
  let cells = grid.children;
  if (water) {
    if (player == "P1") {
      cells[cell].classList.remove("water");
      cells[cell].classList.add("shot");
    } else {
      cells[cell].classList.remove("unknown");
      cells[cell].classList.add("water");
    }
  } else {
    if (player == "P1") {
      // Can remove ship type class from the cell.
      //cells[cell].classList.remove(cells[cell].classList[1]);
      cells[cell].classList.add("touchedP1");
    } else {
      cells[cell].classList.remove("unknown");
      cells[cell].classList.add("touched");
    }
  }
}

function removeListeners() {
  document.querySelector(".gridContainer.P1").style = "pointer-events:none;";
}

function freeze() {
  document.querySelector(".gridContainer.P2").style = "pointer-events:none;";
}

function unfreeze() {
  document.querySelector(".gridContainer.P2").style = "pointer-events:auto;";
}

export {
  prepareCellsListenersDOM,
  displayToPlaceDOM,
  placeAllShipsDOM,
  setTurn,
  receiveAttackDOM,
  freeze,
  unfreeze,
  removeListeners,
};
