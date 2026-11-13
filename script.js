const board = document.getElementById("board");
const statusText = document.getElementById("status");
const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");

let cells = [];
let current = "X";
let xScore = 0;
let oScore = 0;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard(){
  board.innerHTML = "";
  cells = [];

  for(let i=0;i<9;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => move(cell,i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function move(cell,index){
  if(cell.textContent) return;

  cell.textContent = current;

  if(checkWin()){
    if(current==="X"){
      xScore++;
      xScoreText.textContent = xScore;
    }else{
      oScore++;
      oScoreText.textContent = oScore;
    }

    if(xScore===3 || oScore===3){
      alert(current + " wins the match!");
      xScore = 0;
      oScore = 0;
      xScoreText.textContent = 0;
      oScoreText.textContent = 0;
    }

    setTimeout(createBoard,500);
    return;
  }

  if(cells.every(c=>c.textContent)){
    setTimeout(createBoard,500);
    return;
  }

  current = current==="X" ? "O" : "X";
  statusText.textContent = "Player " + current + "'s Turn";
}

function checkWin(){
  return wins.some(combo =>
    combo.every(i => cells[i].textContent === current)
  );
}

createBoard();