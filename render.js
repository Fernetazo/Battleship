import { game } from "./logic.js";

function prepareToggleButton() {
  const button = document.querySelector(".orientationButton");
  button.addEventListener("click", () => {
    button.textContent == "Vertical"
      ? (button.textContent = "Horizontal")
      : (button.textContent = "Vertical");
  });
}

function toggleOptions() {
  const optionsContainer = document.querySelector(".optionsContainer");
  optionsContainer.style.visibility == "hidden"
    ? (optionsContainer.style.visibility = "visible")
    : (optionsContainer.style.visibility = "hidden");
}

function prepareCellsListenersDOM() {
  const grid = document.getElementsByClassName("gridContainer");
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

function displayTurn(player) {
  const display = document.querySelector(".display");
  display.textContent = `It's the turn of ${player.name}`;
}

function showWinner(player) {
  const display = document.querySelector(".display");
  display.textContent = `The winner is ${player}!`;

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset game";
  resetButton.addEventListener("click", game.reset);
  display.appendChild(resetButton);
}

function placeShipDOM(e) {
  const cell = e.target;
  const grid = Array.from(cell.parentNode.children);
  const orientation = document.querySelector(".orientationButton").textContent; //TODO: Should add a DOM button for user select mode, vertical or horizontal
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

function resetBoards() {
  const grid = document.getElementsByClassName("gridContainer");
  let cells;

  cells = grid[0].children;
  Array.from(cells).forEach((e) => {
    e.className = "";
    e.classList.add("cell", "water");
  });

  cells = grid[1].children;
  Array.from(cells).forEach((e) => {
    e.className = "";
    e.classList.add("cell", "unknown");
  });
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

function toggleFreeze(playerBoard) {
  let board = document.querySelector(`.gridContainer.${playerBoard}`);
  board.style.pointerEvents == "none"
    ? (board.style.pointerEvents = "auto")
    : (board.style.pointerEvents = "none");
}

export {
  displayToPlaceDOM,
  prepareToggleButton,
  toggleOptions,
  prepareCellsListenersDOM,
  displayToPlaceDOM,
  placeAllShipsDOM,
  setTurn,
  receiveAttackDOM,
  toggleFreeze,
  displayTurn,
  showWinner,
  resetBoards,
};
