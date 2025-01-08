// Query selecting the buttons so i can make them run playerMove() when clicked
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");

const autoPlayButton = document.querySelector(".js-auto-play");
const resultDisplay = document.querySelector(".js-result-display");
const movesDisplay = document.querySelector(".js-moves-display");
const scoreDisplay = document.querySelector(".js-score-display");

// This object stores the results of the game
score = { wins: 0, losses: 0, ties: 0 };

// The following function picks a random number and gives the computer a coressponding move
// i use return here so i dont have to write else if and else making the code shorter
function computersMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return "Rock";
  if (randomNumber < 2 / 3) return "Paper";
  return "Scissors";
}
// This functions lets the player pick which move they want
// and compares it to the computers move to determine the result
function playerMove(playerPick) {
  const computerPick = computersMove();
  let result = "";
  if (playerPick === computerPick) {
    result = "You, tie";
    score.ties++;
  } else if (
    (playerPick === "Scissors" && computerPick === "Paper") ||
    (playerPick === "Paper" && computerPick === "Rock") ||
    (playerPick === "Rock" && computerPick === "Scissors")
  ) {
    result = "You, win";
    score.wins++;
  } else {
    result = "You, loose";
    score.losses++;
  }
  displayScore();
  displayResult(playerPick, computerPick, result);
  console.log(result);
}
// Added event listener on the move buttons so when clicked it
// picks the corresponding move.
// I used arrow functions because its easier to read than regular
// functions when inside another function
rockButton.addEventListener("click", () => {
  playerMove("Rock");
});
paperButton.addEventListener("click", () => {
  playerMove("Paper");
});
scissorsButton.addEventListener("click", () => {
  playerMove("Scissors");
});

// Now the player can pick moves by pressing the
//  first letter of the move: r, p, and s
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playerMove("Rock");
  } else if (event.key === "p") {
    playerMove("Paper");
  } else if (event.key === "s") {
    playerMove("Scissors");
  }
});

// Autoplay is false by default
let autoPlayIsActive = false;
let intervalId;

// This lets the game play automatically by using computer move
// to pick a random move at every interval, you can cancel
//  auto play by pressing the button again
function autoPick() {
  if (autoPlayIsActive === false) {
    intervalId = setInterval(() => {
      playerMove(computersMove());
    }, 100);
    autoPlayIsActive = true;
  } else {
    clearInterval(intervalId);
    autoPlayIsActive = false;
  }
}

autoPlayButton.addEventListener("click", () => {
  autoPick();
});

// This displays the results in the <div> underneath the move buttons on the page
function displayScore() {
  scoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`;
}

// This shows what the result was and what pick you and the computer made
//  after you picked a move or use autoplay
function displayResult(playerPick, computerPick, result) {
  resultDisplay.innerHTML = `Result: ${result}`;
  movesDisplay.innerHTML = `You picked: ${playerPick}, Computer picked: ${computerPick}`;
}
