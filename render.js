function prepareDOM() {
  const grid = document.getElementsByClassName("gridContainer");
  for (let i = 0; i <= 99; i++) {
    const cell = document.createElement("div");
    const cell2 = document.createElement("div");
    cell.classList.add("cell");
    cell2.classList.add("cell");
    cell2.addEventListener("click", clickCell);
    grid[0].appendChild(cell);
    grid[1].appendChild(cell2);
  }
}

function clickCell(e) {
  const cell = e.target;
  console.log(Array.from(cell.parentNode.children).indexOf(cell));
}

export { prepareDOM };
