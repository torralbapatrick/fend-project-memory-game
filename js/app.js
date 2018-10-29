/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
			'fa-paper-plane-o', 'fa-paper-plane-o',
			'fa-anchor', 'fa-anchor',
			'fa-bolt', 'fa-bolt',
			'fa-cube', 'fa-cube',
			'fa-leaf', 'fa-leaf',
			'fa-bicycle', 'fa-bicycle',
			'fa-bomb', 'fa-bomb'];

// Generate html list of cards
function generateCard(card) {
	return `<li class="card" data-card=${card}>
				<i class="fa ${card}"></i>
			</li>`;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const moveCounter = document.querySelector('.moves');
const starRating = document.querySelector('.stars');
const timer = document.querySelector('.timer');

let moves = 0;
let seconds = 0, minutes = 0, hours = 0, time;
let clockOff = true;

// Initialize game
function initGame() {
	const deck = document.querySelector('.deck');

	const cardHTML = shuffle(cards).map(function(card) { // Shuffle cards
		return generateCard(card);
	});

	deck.innerHTML = cardHTML.join('');

	moves = 0;
	moveCounter.innerText = moves;

	seconds = 0; minutes = 0; hours = 0;
	timer.innerText = "00:00:00";

	starRating.children[0].style.display = "inline";
	starRating.children[1].style.display = "inline";
	
	stopClock();
}

initGame();

const allCards = document.querySelectorAll('.card');
let openCards = [];

for (const card of allCards) {
	card.addEventListener('click', function(evt) {
		// Start clock when a card is clicked
		if (clockOff) {
			startClock();
			clockOff = false;
		}

		// Check if the open card is clicked twice
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');

			// Show only two cards max
			if (openCards.length == 2) {
				setTimeout(function() {
					for (const openCard of openCards) {
						openCard.classList.remove('open', 'show');
					}
					openCards  = [];
				}, 1000);

				// Check if cards are match
				if (openCards[0].dataset.card == openCards[1].dataset.card) {
					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');

					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');
				}

				// Count moves
				moves += 1;
				moveCounter.innerText = moves;

				// Star rating
				if (moves == 13) {
					starRating.children[0].style.display = "none";
				}else if (moves == 25) {
					starRating.children[1].style.display = "none";
				}
			}
		}
	});
}

// Restart game
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
	initGame();
});

// Timer
function startClock() {
	time = setInterval(function() {
		seconds += 1;
		if (seconds >= 60) {
			seconds = 0;
			minutes += 1;
			if (minutes >= 60) {
				minutes = 0;
				hours += 1;
			}
		}

		timer.innerText = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
		(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
		(seconds > 9 ? seconds : "0" + seconds);
	}, 1000);
}

function stopClock() {
	clearInterval(time);
}