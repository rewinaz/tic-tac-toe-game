// Menus

const gamePlayArea = document.querySelector(".gameplay-area");
const popupMenu = document.querySelector(".popup-menu");
const startMenu = document.querySelector(".start-menu");
const restartMenu = document.querySelector(".restart-menu");
// btn
const xoSelectBtn = document.querySelectorAll(".xo-btn");
const xoBtns = document.querySelectorAll(".xo");
const resetBtn = document.querySelector("#restart-btn");
// start menu btn
const gameModeSelector = document.querySelectorAll(".mode-selectors");
const cpuModeBtn = document.querySelector(".cpu-mode-btn");
const playerModeBtn = document.querySelector(".player-mode-btn");
const selectXBtn = document.querySelector(".x-btn");
const selectOBtn = document.querySelector(".o-btn");
// popup menu btn
const quitBtn = document.querySelector("#quit-btn");
const nextRoundBtn = document.querySelector("#next-btn");
// restart menu btn
const noBtn = document.querySelector("#no-btn");
const yesBtn = document.querySelector("#yes-btn");
// text
const currentTurn = document.querySelector("#current-turn");
const winnerText = document.querySelector("#winner-text-popup");
const scoreBoardTextP1 = document.querySelector("#player-1 span");
const scoreBoardTextDraw = document.querySelector("#draw span");
const scoreBoardTextP2 = document.querySelector("#player-2 span");

let playerTurn = true;
let player1Score = [];
let player2Score = [];
let player1State = "";
let player2State = "";
let player1TotalWin = 0;
let player2TotalWin = 0;
let totalDraw = 0;
let totalTurns = 0;
let mode = "";

const winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  //adding eventListner Selecting x or  o
  xoSelectBtn.forEach((xoBtn, i) => {
    xoBtn.addEventListener("click", function (e) {
      if (i === 0) {
        selectXBtn.classList.add("xo-selected");
        selectOBtn.classList.remove("xo-selected");
        player1State = "x";
        player2State = "o";
      } else {
        selectXBtn.classList.remove("xo-selected");
        selectOBtn.classList.add("xo-selected");
        player1State = "o";
        player2State = "x";
      }
    });
  });

  // adding eventListner selecting game mode
  playerModeBtn.addEventListener("click", function (e) {
    if (player1State) {
      startMenu.classList.add("hidden");
      gamePlayArea.classList.remove("hidden");
    }
    mode = "vsplayer";
  });

  cpuModeBtn.addEventListener("click", function () {
    mode = "vscpu";
    // hiding menus
    if (player1State) {
      startMenu.classList.add("hidden");
      gamePlayArea.classList.remove("hidden");
    }
  });
};

startGame();

const gameEventHandler = (e) => {
  totalTurns++;
  // add xo
  e.target.insertAdjacentHTML(
    "beforeend",
    ` <i class="fa-solid fa-${playerTurn ? player1State : player2State}"></i>`
  );
  //push
  playerTurn
    ? player1Score.push(+e.target.id)
    : player2Score.push(+e.target.id);
  e.target.classList.add("selected");
  //check win
  if (player1Score.length >= 3) checkWin();
  currentTurn.textContent = "";
  currentTurn.insertAdjacentHTML(
    "beforeend",
    `<i class="fa-solid fa-${
      playerTurn ? player1State : player2State
    }"></i> <span>Turn</span>`
  );
  // cpu mode
  playerTurn = !playerTurn;
  if (mode === "vscpu") {
    cpuMode();
  }
};

xoBtns.forEach((xoBtn) => {
  xoBtn.addEventListener("click", gameEventHandler, { once: true });
});

// resetting game
resetBtn.addEventListener("click", () => {
  restartMenu.classList.remove("hidden");
});
yesBtn.addEventListener("click", function () {
  resetToInitial();
  startMenu.classList.remove("hidden");
  restartMenu.classList.add("hidden");
  gamePlayArea.classList.add("hidden");
  player1State = "";
  player2State = "";
  player1TotalWin = 0;
  player2TotalWin = 0;
  totalDraw = 0;
  scoreBoardTextDraw.textContent = 0;
  scoreBoardTextP1.textContent = 0;
  scoreBoardTextP2.textContent = 0;
});
noBtn.addEventListener("click", () => {
  restartMenu.classList.add("hidden");
});
// reset ends here

const checkWin = () => {
  console.log(playerTurn ? `player${playerTurn}` : `cpu${playerTurn}`);
  let isWinner = false;
  if (playerTurn) {
    winningPossibilities.forEach((possiblity) => {
      if (possiblity.every((el) => player1Score.includes(el))) {
        isWinner = possiblity.every((el) => player1Score.includes(el));
      }
    });
  } else if (playerTurn === false) {
    winningPossibilities.forEach((possiblity) => {
      if (possiblity.every((el) => player2Score.includes(el))) {
        isWinner = possiblity.every((el) => player2Score.includes(el));
      }
    });
  } else if (totalTurns === 9) {
    isWinner = 0;
  }
  if (isWinner || totalTurns === 9) {
    if (totalTurns !== 9) playerTurn ? player1TotalWin++ : player2TotalWin++;
    totalTurns === 9 && totalDraw++;
    scoreBoardTextDraw.textContent = totalDraw;
    scoreBoardTextP1.textContent = player1TotalWin;
    scoreBoardTextP2.textContent = player2TotalWin;
    gameEnd();
  }
};

const gameEnd = () => {
  popupMenu.classList.remove("hidden");
  if (totalTurns === 9) {
    winnerText.insertAdjacentHTML("beforeend", `Draw`);
  } else {
    winnerText.insertAdjacentHTML(
      "beforeend",
      ` <i class="fa-solid fa-${playerTurn ? player1State : player2State}"></i>`
    );
  }
  // exiting game event Listner
  quitBtn.addEventListener("click", function () {
    startMenu.classList.remove("hidden");
    popupMenu.classList.add("hidden");
    gamePlayArea.classList.add("hidden");

    player1State = "";
    player2State = "";
    player1TotalWin = 0;
    player2TotalWin = 0;
    totalDraw = 0;
    resetToInitial();
  });
  // Restarting game event Listner
  nextRoundBtn.addEventListener("click", function () {
    popupMenu.classList.add("hidden");
    gamePlayArea.classList.remove("hidden");

    resetToInitial();
  });
};

const resetToInitial = () => {
  playerTurn = true;
  player1Score = [];
  player2Score = [];
  selectOBtn.classList.remove("xo-selected");
  selectXBtn.classList.remove("xo-selected");
  totalTurns = 0;

  winnerText.textContent = "";
  xoBtns.forEach((xoBtn) => {
    xoBtn.removeEventListener("click", gameEventHandler);
    xoBtn.textContent = "";
    xoBtn.classList.remove("selected");
    xoBtn.addEventListener("click", gameEventHandler, { once: true });
  });
};

// cpu mode
function cpuMode() {
  let availableSpots = [];
  // checking for available spots
  xoBtns.forEach((xoBtn, i) => {
    if (xoBtn.classList.contains("selected") === false) availableSpots.push(i);
  });
  if (availableSpots.length > 1 && playerTurn == false && totalTurns < 9) {
    let random = Math.floor(Math.random() * (availableSpots.length - 1));
    let index = availableSpots[random];
    xoBtns[index].classList.add("selected");
    xoBtns[index].insertAdjacentHTML(
      "beforeend",
      ` <i class="fa-solid fa-${playerTurn ? player1State : player2State}"></i>`
    );
    xoBtns[index].removeEventListener("click", gameEventHandler);
    player2Score.push(index);
    totalTurns++;
    availableSpots.splice(random, 1);
    console.log("EXPECT ME");
    if (player1Score.length >= 3) checkWin();
    playerTurn = !playerTurn;
  }
  console.log(availableSpots, player2Score, player1Score, totalTurns);
}


