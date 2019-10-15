/*
 * Create a list that holds all of your cards
 */
const cardList = [];
const cardElement = document.querySelectorAll('.card');
for (const card of cardElement) {
	cardList.push(card);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//Resets game when restart button is clicked
let restart = document.querySelector('.restart');
restart.addEventListener('click', startGame);
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
//Starting conditions
let openCards = [];
let numberOfMoves = 0;
let numberOfMatches = 0;
let deck = document.querySelector('.deck');
let startTime = Date.now();
let time = document.querySelector('timer');
//Begins timer
function startTimer(time) {
	setInterval(function() {
		var timeChange = Date.now() - startTime;
		if(numberOfMatches==8){
			return;
		}
		timer.innerText = (Math.floor(timeChange / 1000) + " seconds");
	}, 1000)
}


function startGame() {
	//begins game by shuffling cards
	openCards=[];
	numberOfMoves = 0;
	numberOfMatches = 0;
	Enable=true;
	let zeroMoves = document.querySelector('.moves');
	zeroMoves.textContent = 0;
	startTime = Date.now();
	const cards = shuffle(cardList);
	for (const card of cards) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
		deck.appendChild(card);
	}
	document.querySelector('.stars').innerHTML="";
	const newStars = document.querySelector('.stars');
	let createStars = document.createElement('LI');
	for(i=1; i<=3; i++){
	let createStar = document.createElement('LI');
	createStar.appendChild(document.createTextNode(""));
	createStar.setAttribute("class", "fa fa-star");
	newStars.appendChild(createStar);
	startTimer();
	}

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
//adds event listener to turn card over when clicked to all cards
for (const card of cardList) {
	card.addEventListener('click', function() {
		if (card.classList.contains('open')) {} else {
			displayCard(card);
			compare(card);
		}
	});
}
//displays card
function displayCard(card) {
	card.classList.add('open', 'show');
	return card;
}
//adds displayed card to list of opened cards
function openCard(card) {
	openCards.push(card);
}
//this function is to compare two cards when they are selected
let compareCards = [];

function compare(card) {
	compareCards.push(card);
	if (compareCards.length == 2) {
		if (compareCards[0].isEqualNode(compareCards[1])) {
			cardMatch(compareCards);
			numberOfMatches += 1;
			compareCards = [];
			numberOfMoves += 1;
			starRating(numberOfMoves);
			if (numberOfMatches == 8) {
				var endTime = Date.now();
				var totalTime = (endTime - time) / 1000;
				const finalRating = document.querySelector('.stars').getElementsByTagName("li").length;
				winGame(totalTime, finalRating);
			}
		} else {
			noMatch(compareCards);
			compareCards = [];
			numberOfMoves += 1;
			starRating(numberOfMoves);
		}
	}
}
//if two cards match then they have match added to their class list
function cardMatch() {
	for (card of compareCards) {
		card.classList.add('match');
	}
}
//if two cards do not match then they are flipped back over
function noMatch(compareCards) {
	setTimeout(function() {
		for (card of compareCards) {
			card.classList.remove('open');
			card.classList.remove('show');
		}
	}, 1000);
}
//*************************Stars*******************************
//counts the number of moves and removes stars as moves are added
let stars = document.querySelector('.stars');
let moves = document.querySelector('.moves');

function starRating(numberOfMoves) {
	moves.textContent = numberOfMoves;
	if (numberOfMoves == 10) {
		stars.removeChild(stars.childNodes[1]);
	}
	if (numberOfMoves == 20) {
		stars.removeChild(stars.childNodes[1]);
	}
}
//********************Modal**************************************
//Found modal example in W3schools, edited to apply to matching game
// Get the modal
var modal = document.getElementById("myModal");
//Get the modal content
var modalContent = document.getElementsByClassName('modal-content')[0];
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
	startGame();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function winGame(starRating, totalTime) {
	var winningStars = document.querySelectorAll('.fa-star');
	var div = winningStars.length;
	var winningTime = document.getElementById('timer');
	var winTime = winningTime.textContent;
	modalContent.textContent = "Congratulations you won! It took you " + winTime + " and you received " + div + " stars! If you would like to play again please click the restart button.";
	modal.style.display = "block";
}

window.onload = startGame;