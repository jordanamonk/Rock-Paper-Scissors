const computerPlay = () => {
  let randomNumber = Math.floor(Math.random() * 3); // returns random integer from 0 to 2
  // assign each of the three possibilities a string
  return randomNumber === 0
    ? "Rock"
    : randomNumber === 1
    ? "Paper"
    : "Scissors";
};

const capitalize = (str) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
};

function playRound(playerSelection, computerSelection) {
  playerSelection = prompt("Rock, paper, or scissors?");
  playerSelection = capitalize(playerSelection);
  let bothPlays = playerSelection + " vs. " + computerSelection;

  if (playerSelection === computerSelection) {
    bothPlays = "tie";
  }

  let message; // round results message

  // compare for each case and for tie
  switch (bothPlays) {
    case "Rock vs. Scissors":
    case "Paper vs. Rock":
    case "Scissors vs. Paper":
      message = `You win! ${playerSelection} beats ${computerSelection}`;
      break;

    case "tie":
      message = "You tied! Do over!";
      break;

    default:
      message = `You lose! ${computerSelection} beats ${playerSelection}`;
      break;
  }
  return message;
}

// const playerSelection = 'ROCK';
let playerSelection;
const computerSelection = computerPlay();

const game = (numberOfRounds) => {
  let playerScore = 0;
  let computerScore = 0;
  let roundScore = "";
  let currentRound = 1;
  const totalRounds = numberOfRounds;
  let gameWinner = "It's a draw";

  function score() {
    let roundResult = playRound(playerSelection, computerPlay());
    if (roundResult.startsWith("You win")) {
      playerScore++;
    } else if (roundResult.startsWith("You lose")) {
      computerScore++;
    } else {
      numberOfRounds++;
    }
    roundScore = `--Round ${currentRound} of ${totalRounds}--\n${roundResult}\nYou: ${playerScore} Computer: ${computerScore}\n`;
    if (
      roundResult.startsWith("You win") ||
      roundResult.startsWith("You lose")
    ) {
      currentRound++;
    }
    console.log(roundScore);
  }

  for (var i = 0; i < numberOfRounds; i++) {
    if (playerScore <= totalRounds / 2 && computerScore <= totalRounds / 2) {
      score();
    }
  }

  if (playerScore > computerScore) {
    gameWinner = "You are the winner!";
  } else if (computerScore > playerScore) {
    gameWinner = "The computer wins the game!";
  }
  return gameWinner;
};

console.log(game(5));
