const deck = document.querySelector('.deck'),
moveCounter = document.querySelector('.moves'),
starRating = document.querySelector('.stars'),
timer = document.querySelector('.timer'),
restartButton = document.querySelector('.restart'),
stats = document.querySelector('.stats'),
modal = document.querySelector('.modal'),
playAgain = document.querySelector('.play-again');

const cards = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube',
'fa-leaf', 'fa-leaf',
'fa-bicycle', 'fa-bicycle',
'fa-bomb', 'fa-bomb'];

let openCards, match, moves, rating, seconds, minutes, hours, clock, time, clockOff, canFlip;

// Generate html list of cards
function generateCard(card) {
	return `<li class="card" data-card=${card}>
				<i class="fa ${card}"></i>
			</li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initialize game
function initGame() {
	modal.style.display = "none";

	const cardHTML = shuffle(cards).map(function(card) { // Shuffle cards
		return generateCard(card);
	});

	deck.innerHTML = cardHTML.join('');

	flashCards();
	displayMovesAndRating();
	displayClock();
	stopClock();
	activateCards();
}

// Show all cards for 1 second
function flashCards() {
	const allCards = document.querySelectorAll('.card');
	for (const card of allCards) {
		card.classList.add('open', 'show');
	}
	setTimeout(function() {
		for (const card of allCards) {
			card.classList.remove('open', 'show');
		}
	}, 1000);
}

// Add listener to the cards
function activateCards() {
	const allCards = document.querySelectorAll('.card');
	canFlip = true;
	openCards = [];
	match = 0;

	for (const card of allCards) {
		card.addEventListener('click', function() {
			startClock();
			showCard(card);
		});
	}
}

function showCard(card) {
	// Check if the open card is clicked twice
	if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
		// Show only two cards max
		if (canFlip) {
			card.classList.add('open', 'show');
			openCards.push(card);

			// Show cards for .5 second then hide it again
			if (openCards.length == 2) {
				setTimeout(function() {
					for (const openCard of openCards) {
						openCard.classList.remove('open', 'show');
					}
					openCards  = [];
					canFlip = true;
				}, 500);

				canFlip = false;

				countMoves();
				checkForMatch(openCards[0], openCards[1]);
			}
		}
	}
}

// Check if cards are match
function checkForMatch(card1, card2) {
	if (card1.dataset.card == card2.dataset.card) {
		card1.classList.add('match');
		card1.classList.add('open');
		card1.classList.add('show');

		card2.classList.add('match');
		card2.classList.add('open');
		card2.classList.add('show');

		match += 1;

		// Check if the game is won
		if (match == 8) {
			stopClock();
			let stat = `In ${time} with ${moves} moves`;

			if(rating == 3) {
				stat = `${stat} and ${rating} stars!`;
			} else if (rating == 2) {
				stat = `${stat} and ${rating} stars!`;
			} else {
				stat = `${stat} and ${rating} star!`;
			}

			stats.innerText = stat;
			modal.style.display = "block";
		}
	}
}

// Move counter and star rating
function displayMovesAndRating() {
	moves = 0; rating = 3;
	moveCounter.innerText = moves;

	starRating.children[2].classList.remove('fa-star-o');
	starRating.children[2].classList.add('fa-star');

	starRating.children[1].classList.remove('fa-star-o');
	starRating.children[1].classList.add('fa-star');
}

function countMoves() {
	moves += 1;
	moveCounter.innerText = moves;

	// Star rating
	if (moves == 13) {
		starRating.children[2].classList.remove('fa-star');
		starRating.children[2].classList.add('fa-star-o');
		rating -= 1;
	}else if (moves == 25) {
		starRating.children[1].classList.remove('fa-star');
		starRating.children[1].classList.add('fa-star-o');
		rating -= 1;
	}
}

// Timer
function displayClock() {
	seconds = 0; minutes = 0; hours = 0;
	timer.innerText = "00:00:00";
}

function startClock() {
	if (clockOff) {
		clock = setInterval(function() {
			seconds += 1;
			if (seconds >= 60) {
				seconds = 0;
				minutes += 1;
				if (minutes >= 60) {
					minutes = 0;
					hours += 1;
				}
			}

			time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
			(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
			(seconds > 9 ? seconds : "0" + seconds);

			timer.innerText = time;
		}, 1000);

		clockOff = false;
	}
}

function stopClock() {
	clockOff = true;
	clearInterval(clock);
}

// Restart game
restartButton.addEventListener('click', function() {
	initGame();
});

playAgain.addEventListener('click', function() {
	initGame();
});

// Initialize game
initGame();