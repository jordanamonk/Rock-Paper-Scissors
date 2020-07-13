let playerSelection;
let playerScore = 0;
let computerScore = 0;
let gameWinner = '';
let gameOver = false;
const gameButtons = document.querySelectorAll('button');

const computerPlay = () => {
	let randomNumber = Math.floor(Math.random() * 3); // returns random integer from 0 to 2
	// assign each of the three possibilities a string
	return (randomNumber === 0) ? 'Rock' : (randomNumber === 1) ? 'Paper' : 'Scissors';
}

gameButtons.forEach((gameButton) => {
	gameButton.addEventListener('click', function(event) {
		playerSelection = event.target.textContent;
		if (gameOver === true) return; // don't play another round if the game is over
		playRound(playerSelection);
	});
});

function playRound(playerSelection) {
	let computerSelection = computerPlay(); // run once each round
	let bothPlays = playerSelection + ' vs. ' + computerSelection;
	let message;  // round results message

	if (playerSelection === computerSelection) {
		bothPlays = 'tie';
	}

	// compare for each case and for tie
	switch (bothPlays) {
		case 'Rock vs. Scissors' : 
		case 'Paper vs. Rock' : 
		case 'Scissors vs. Paper' :
			message = `You win! ${playerSelection} beats ${computerSelection}`;
		break;

		case 'tie' : 
			message = 'You tied! Do over!';
		break;

		default : 
			message = `You lose! ${computerSelection} beats ${playerSelection}`;
		break;
	}
	view.displayResults(message);
	updateScore(message);
}

const updateScore = (roundResult) => {
	if (roundResult.startsWith("You win")) {
		playerScore++;
	} else if (roundResult.startsWith("You lose")) {
		computerScore++;
	} 
	view.displayScore(playerScore, computerScore);

	if (playerScore === 5 || computerScore === 5) {
		determineWinner();
		gameOver = true;
	}
};

const determineWinner = () => {
	if (playerScore === 5) {
		gameWinner = 'You are the winner!';
		view.displayWinner(gameWinner);
	} else if (computerScore === 5) {
		gameWinner = 'The computer wins the game!';
		view.displayWinner(gameWinner);
	}
	view.displayPlayAgain();
};


const view = {
	displayResults: function(message) {
		const resultsDiv = document.querySelector('#results');
		resultsDiv.textContent = message;
	},
	displayScore: function(playerScore, computerScore) {
		const playerScoreTd = document.querySelector('#your-score');
		const computerScoreTd = document.querySelector('#computer-score');
		playerScoreTd.textContent = playerScore;
		computerScoreTd.textContent = computerScore;
	},
	displayWinner: function(gameWinner) {
		const scoreBoard = document.querySelector('#scoreboard');
		const winnerDiv = document.createElement('div');
		winnerDiv.setAttribute('id', 'winner');
		winnerDiv.textContent = gameWinner;
		scoreBoard.appendChild(winnerDiv);
	},
	displayPlayAgain: function() {
		const playAgainButton = document.createElement('button');
		const scoreBoard = document.querySelector('#scoreboard');
		playAgainButton.setAttribute('id', 'play-again-button');
		playAgainButton.textContent = 'Play Again';
		scoreBoard.appendChild(playAgainButton);
		playAgainButton.addEventListener('click', restartGame);
	},
	removePlayAgain: function() {
		const playAgainButton = document.querySelector('#play-again-button');
		const scoreBoard = document.querySelector('#scoreboard');
		scoreBoard.removeChild(playAgainButton);
	},
	removeWinner: function() {
		const scoreBoard = document.querySelector('#scoreboard');
		const winnerDiv = document.querySelector('#winner');
		scoreBoard.removeChild(winnerDiv);
	}
};

const restartGame = () => {
	gameOver = false;
	playerScore = 0;
	computerScore = 0;
	gameWinner = '';

	view.displayResults('First to score 5 points wins!');
	view.displayScore(playerScore, computerScore);
	view.removeWinner();
	view.removePlayAgain();
};