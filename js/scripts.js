const pad = document.body.getElementsByClassName("sketch-pad")[0];
const leftButtons = document.body.getElementsByClassName("left-buttons")[0];
const sizeButtons = Array.from(leftButtons.children);

function makeGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.className = "2";
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    pad.appendChild(square);
  }
}
makeGrid(100);


function paint(e) {
  if (e.target.className !== "sketch-pad") {
    let blackLevel = parseInt(e.target.className);
    blackLevel++;
    if (blackLevel < 9) {
      e.target.style.backgroundColor = `rgba(0,0,0,0.${blackLevel})`;
    }
    e.target.className = `${blackLevel}`;
  }
}

function isSelected(target) {
  if (target.className === "selected") {
    return true;
  }
  return false;
}

function selectSize(target) {
  sizeButtons.forEach(button => {
    if (button === target) button.className = "selected";
    else button.classList.remove("selected");
  });
}

pad.addEventListener("mouseover", paint);

leftButtons.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    if (!isSelected(e.target)) {
      selectSize(e.target);
    }
  }
});
