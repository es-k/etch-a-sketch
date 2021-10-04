const pad = document.body.getElementsByClassName("sketch-pad")[0];
const sizeButtons = document.body.getElementsByClassName("size-buttons")[0];
const colorButtons = document.body.getElementsByClassName("color-buttons")[0];
const clearButton = document.getElementById("clear");

function makeGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.className = "2";
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    pad.appendChild(square);
  }
}

function removeGrid() {
  grid = [...pad.children];
  grid.forEach((square) => square.remove());
}

function paintGray(e) {
  if (e.target.className !== "sketch-pad") {
    let blackLevel = parseInt(e.target.className);
    blackLevel++;
    if (blackLevel < 9) {
      e.target.style.backgroundColor = `rgba(0,0,0,0.${blackLevel})`;
    }
    e.target.className = `${blackLevel}`;
  }
}

function paintRainbow(e) {
  if (e.target.className !== "sketch-pad") {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = `#${color}`;
  }
}

function isSelected(target) {
  if (target.className === "selected") {
    return true;
  }
  return false;
}

function Select(target) {
  const siblings = [...target.parentNode.children];
  siblings.forEach((button) => {
    if (button === target) button.className = "selected";
    else button.classList.remove("selected");
  });
}



pad.addEventListener("mouseover", paintRainbow);

sizeButtons.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    if (!isSelected(e.target)) {
      Select(e.target);
      removeGrid();
      makeGrid(`${e.target.id}`);
    }
  }
});

colorButtons.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    if (!isSelected(e.target)) {
      Select(e.target);
    }
  }
});

clearButton.addEventListener("click", (e) => {
  removeGrid();
});
