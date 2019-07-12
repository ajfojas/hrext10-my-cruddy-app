//localStorage functions
let storeChoice = function(key, value) {
	return window.localStorage.setItem(key, value);
};

let clearDatabase = function() {
	return window.localStorage.clear();
};

let showDatabase = function() {
	$('tbody').html("");
	let winCount = 0;
	let orderedStorage = Object.entries(window.localStorage)
		.filter(element => element[0] !== "name")
		.sort(function(a, b){return a[0] - b[0]});

	for(let i = orderedStorage.length - 1; i >= 0; i--) {
		let round = orderedStorage[i][0];
		let value = JSON.parse(orderedStorage[i][1]);
		let yourAnswer = value[0];
		let botAnswer = value[1];
		let result = value[2];

		if(value[2] === "Win") {
			$('tbody').append(`<tr><td>${round}</td><td>${yourAnswer}</td><td>${botAnswer}</td><td style="color:green;">${result}</td></tr>`);
			winCount++;
		} else if(value[2] === "Lose") {
			$('tbody').append(`<tr><td>${round}</td><td>${yourAnswer}</td><td>${botAnswer}</td><td style="color:red;">${result}</td></tr>`);
		} else {
			$('tbody').append(`<tr><td>${round}</td><td>${yourAnswer}</td><td>${botAnswer}</td><td>${result}</td></tr>`);
		}
		
	}

	$('.progress-bar').html("");

	if(orderedStorage.length === 0 || winCount === 0) {
		$('.progress-bar').append(`0%`);
		$('.progress-bar').css("width", "0%");
		$('.progress-bar').css("margin-left", "10px");
	} else {
		let percentage = (winCount / orderedStorage.length * 100).toFixed(0);
		$('.progress-bar').append(`${percentage}%`);
		$('.progress-bar').css("width", `${percentage}%`);
		$('.progress-bar').css("margin-left", "0");
	}

	// $('.player-you').html("");

	// if(window.localStorage.getItem(name) !== undefined) {
	// 	$('.player-you').append(`
	// 		${window.localStorage.getItem('name')}&nbsp
	// 		<button class="button-edit btn btn-outline-secondary btn-sm" type="button" id="button-addon2">edit</button>`);
	// } else if(window.localStorage.getItem(name) === "") {
	// 	$('.player-you').append(`
	// 		YOU&nbsp
	// 		<button class="button-edit btn btn-outline-secondary btn-sm" type="button" id="button-addon2">edit</button>`);
	// }
};

//additional functionality
let randomElement = function(array) {
	let randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

let botChoice = function() {
	let choices = ["Rock", "Paper", "Scissors"];
	return randomElement(choices);
};

let resetAnswers = function() {
	return [];
};

let scrollFunction = function() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$('.button-scroll-top').css("display", "block");
	} else {
		$('.button-scroll-top').css("display", "none");
	}
};

window.onscroll = function() { //shows button when user scrolls down 20px from top of document
	scrollFunction()
};

let topFunction = function() { //scrolls to top of document when user clicks on button
	document.body.scrollTop = 0; //for Safari
	document.documentElement.scrollTop = 0; //for Chrome, Firefox, IE and Opera
};

let botThoughts = function() {
	let thoughts = ["...thinking", "Ready to \"Rock\"", "Thinking of something \"Tearable\"", "I\'m a \"Cut\" above the rest", "...hmm"];
	return randomElement(thoughts);
};

let botThinking = function() {
	$('.thinking').html("");
	$('.thinking').append(`
		<div class="spinner-grow spinner-grow-sm text-info" role="status">
			<span class="sr-only">Loading...</span>
		</div>
		${botThoughts()}`);
	setTimeout(botThinking, 5000);
};
botThinking();

$(document).ready(function() {
	showDatabase();
	let value = [];

	$('.button-rock').on("click", function() {
		value.push("Rock");
		value.push(botChoice());

		if(value[1] === "Rock") {
			value.push("Draw");
		} else if(value[1] === "Paper") {
			value.push("Lose");
		} else if(value[1] === "Scissors") {
			value.push("Win");
		}

		storeChoice(window.localStorage.length + 1, JSON.stringify(value));
		showDatabase();
		value = resetAnswers();
	});

	$('.button-paper').on("click", function() {
		value.push("Paper");
		value.push(botChoice());

		if(value[1] === "Rock") {
			value.push("Win");
		} else if(value[1] === "Paper") {
			value.push("Draw");
		} else if(value[1] === "Scissors") {
			value.push("Lose");
		}

		storeChoice(window.localStorage.length + 1, JSON.stringify(value));
		showDatabase();
		value = resetAnswers();
	});

	$('.button-scissors').on("click", function() {
		value.push("Scissors");
		value.push(botChoice());

		if(value[1] === "Rock") {
			value.push("Lose");
		} else if(value[1] === "Paper") {
			value.push("Win");
		} else if(value[1] === "Scissors") {
			value.push("Draw");
		}

		storeChoice(window.localStorage.length + 1, JSON.stringify(value));
		showDatabase();
		value = resetAnswers();
	});

	$('.button-clear').on("click", function() {
		if(confirm("WARNING: This will clear your record.\nTHIS ACTION CANNOT BE UNDONE")) {
			clearDatabase();
			showDatabase();
		}
	});

	$('.player-you').on("click", ".button-edit", function(event) {
		event.preventDefault();
		$('.player-you').html("");
		$('.player-you').append(`
			<div class="input-group mb-3">
			  <input type="text" class="name form-control" placeholder="Your name" aria-label="Your name" aria-describedby="button-addon2">
			  <div class="input-group-append">
			    <button class="button-submit btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
			  </div>
			</div>`);
	});

	$('.player-you').on("click", ".button-submit", function(event) {
		// event.preventDefault();
		// let $name = $('.name').val();
		// storeChoice("name", $name);
		// showDatabase();



		event.preventDefault();
		let name = $('.name').val();

		// storeChoice("name", name);
		
		$('.player-you').html("");
		if(name === "") {
			$('.player-you').append(`
				YOU&nbsp
				<button class="button-edit btn btn-outline-secondary btn-sm" type="button" id="button-addon2">edit</button>`);
		} else {
			$('.player-you').append(`
				${name}&nbsp
				<button class="button-edit btn btn-outline-secondary btn-sm" type="button" id="button-addon2">edit</button>`);
		}
	});

	$('.button-scroll-top').on("click", function() {
		topFunction();
	});
});