function render() {
  const grid = document.getElementsByClassName("gridContainer");
  console.log(grid);
  for (let i = 0; i <= 99; i++) {
    const cell = document.createElement("div");
    const cell2 = document.createElement("div");
    cell.classList.add("cell");
    cell2.classList.add("cell");
    grid[0].appendChild(cell);
    grid[1].appendChild(cell2);
  }
}

export { render };
