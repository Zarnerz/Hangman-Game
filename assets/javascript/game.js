// Initialized variables/booleans/arrays/etc.

running = false;
correct = false;
wins = 0;

// Array of guessable characters

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
				'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Array of potential words to guess

var gods = ['ZUES', 'POSEIDON', 'HADES', 'APOLLO', 'ATLAS', 'APHRODITE', 'ARTEMIS',
			'ODIN', 'THOR', 'LOKI', 'TYR', 'FREYA', 'HEIMDALL', 'OSIRIS', 'ISIS',
			'ANUBIS', 'RA', 'HORUS', 'THOTH', 'MUT'];

// Event to call the newGame function

document.body.addEventListener('keypress', newGame);

// Function for creating a new game and reseting variables

function newGame () {
	if (running) return;
	running = true;
	characters = [];
	guessesLeft = 10;
	wrongGuess = [];
	main();
}

// Main function for game order and organization

function main () {
	pick();
	blanks();
	userGuess();
}

// Pick a random word from gods array

function pick () {
	// equation to generate random word from gods array
	answer = gods[Math.floor(Math.random() * gods.length)];
	console.log(answer);
}

// Create blank spaces for each character in word

function blanks () {
	for (i = 0; i < answer.length; i++) {
		characters.push("__");
	}
	document.getElementById("blanks").innerHTML = characters;
	console.log(characters);
}

// Get guess from user

function userGuess () {
	// detect which key is pressed
	var k = event.key;
	// turn input into uppercase
	guess = k.toUpperCase(); 
	check();
}

// Check that user entered a valid letter

function check () {
	for (var i in alphabet) {
		letter = alphabet[i];
			if (letter === guess) {
				check2();
				break;
			}
			// else
			// 	console.log("Please choose a letter A-Z");
			// 	document.body.addEventListener('keypress', userGuess);
		}
	console.log("Please choose a letter A-Z");
	document.body.addEventListener('keypress', userGuess);

}

// Check if user input matches a letter in answer

function check2 () {
	for (var i = 0; i < answer.length; i++) {
		if (guess === answer[i]) {
			characters[i] = guess;
			correct = true;
			replace();
			console.log(characters[i]);
		} 
	} 
	if (correct === false){
		guessesLeft--;
		document.getElementById("guessesLeft").innerHTML = guessesLeft;
		console.log(guessesLeft);
		wrong();
		console.log(guess);
		console.log("wrong");

	}

	correct = false;
}

// Replace matching letters

function replace () {
	// characters.join(" ");
	document.getElementById("blanks").innerHTML = characters.join(" ");
	console.log(characters);
	win();
}

// Letters already guessed if wrong

function wrong () {
	wrongGuess.push(guess);
	document.getElementById("guessed").innerHTML = wrongGuess;
	console.log(wrongGuess);
	gameOver();
}


// Determine if user wins

function win () {
	for (var i in characters) {
		if (guess[i] === answer[i]) {
			console.log("You Win");
			wins++;
			document.getElementById("wins").innerHTML = wins;
			console.log(wins);
			running = false;
			alert("YOU WIN! Press any key to restart");
			console.log("Press any key to restart");
			document.body.addEventListener('keypress', newGame);
		}
		else
			gameOver();
			break;
	}
}

// Determine if the game is over or should continue

function gameOver () {
	if (guessesLeft === 0) {
		console.log("You Lose");
		running = false;
		console.log("Press any key to restart");
		document.body.addEventListener('keypress', newGame);

	}
	else 
		console.log("Choose another letter");
		document.body.addEventListener('keypress', userGuess);
}

