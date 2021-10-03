const pad = document.body.getElementsByClassName("sketch-pad")[0];

function makeGrid(size){
  for (let i = 0; i < size; i++){
    const square = document.createElement("div");
    square.className = "square";
    pad.appendChild(square);
  }  
}

makeGrid(16);