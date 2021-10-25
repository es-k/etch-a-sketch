const pad = document.body.getElementsByClassName("sketch-pad")[0];
const sizeButtons = document.body.getElementsByClassName("size-buttons")[0];
const colorButtons = document.body.getElementsByClassName("color-buttons")[0];
const clearButton = document.getElementById("clear");

function makeGrid(size) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.className = "2";
    fragment.appendChild(square);
  }
  pad.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  pad.appendChild(fragment);
}

function removeGrid() {
  pad.innerHTML = "";
}

function clearGrid() {
  [...pad.children].forEach((square) => {
    square.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    square.className = "2";
  });
}

function paintGray(e) {
  if (e.target.className !== "sketch-pad") {
    let blackLevel = parseInt(e.target.className);
    blackLevel++;
    if (blackLevel <= 9) {
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
  if (target.className === "selected") return true;
  return false;
}

function Select(target) {
  const siblings = [...target.parentNode.children];
  siblings.forEach((button) => {
    if (button === target) button.className = "selected";
    else button.classList.remove("selected");
  });
}

function changeColor(e) {
  if (e.target.id === "gray") {
    pad.removeEventListener("mouseover", paintRainbow);
    pad.addEventListener("mouseover", paintGray);
  } else if (e.target.id === "rainbow") {
    pad.removeEventListener("mouseover", paintGray);
    pad.addEventListener("mouseover", paintRainbow);
  }
}

// EVENTS //

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
      changeColor(e);
    }
  }
});

clearButton.addEventListener("click", (e) => {
  clearGrid();
});

// DEFAULTS //

//Grayscale
const grayButton = document.getElementById("gray");
grayButton.className = "selected";
pad.addEventListener("mouseover", paintGray);

//Medium Size
const mediumButton = document.getElementById("32");
mediumButton.className = "selected";
makeGrid(32);
