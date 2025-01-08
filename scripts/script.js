// query selecting the buttons so i can make them run playerMove() when clicked
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");

const autoPlayButton = document.querySelector(".js-auto-play");
const resultdisplay = document.querySelector(".js-result-display");

// the following function picks a random number and gives the computer a coressponding move
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
  } else if (
    (playerPick === "Scissors" && computerPick === "Paper") ||
    (playerPick === "Paper" && computerPick === "Rock") ||
    (playerPick === "Rock" && computerPick === "Scissors")
  ) {
    result = "You, win";
  } else {
    result = "You, loose";
  }
  console.log(result);
}
// added event listener on the move buttons so when clicked it
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

// this lets the game play automatically by using computer move
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
