const pad = document.body.getElementsByClassName("sketch-pad")[0];
const buttons = document.body.getElementsByClassName("buttons")[0];

function makeGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.className = "3";
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    pad.appendChild(square);
  }
}
makeGrid(16);


function paint(e) {
  if (e.target.className !== "sketch-pad"){
    let blackLevel = parseInt(e.target.className);
    blackLevel++;
    if (blackLevel < 9){
      e.target.style.backgroundColor = `rgba(0,0,0,0.${blackLevel})`;
    }
    e.target.className = `${blackLevel}`;
  }
}

function isClicked(e){
  if (e.target.className === "clicked"){
    e.target.classList.remove("clicked");
    return true;
  }
  e.target.className = "clicked";
  return false;
}

pad.addEventListener("mouseover", paint);
