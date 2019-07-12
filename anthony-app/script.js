// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
	scrollFunction()
};

let scrollFunction = function() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$('.button-scroll-top').css("display", "block");
	} else {
		$('.button-scroll-top').css("display", "none");
	}
}

// When the user clicks on the button, scroll to the top of the document
let topFunction = function() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



//localStorage functions
let storeChoice = function(key, value) {
	return window.localStorage.setItem(key, value);
};

let clearDatabase = function() {
	return window.localStorage.clear();
};

let showDatabase = function() {
	let winCount = 0;

	$('tbody').html("");
	let orderedStorage = Object.entries(window.localStorage).sort(function(a, b){return a[0] - b[0]});

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
};

let botChoice = function() {
	let choices = ["Rock", "Paper", "Scissors"];
	let randomIndex = Math.floor(Math.random() * choices.length);
	return choices[randomIndex];
};

let resetAnswers = function() {
	return [];
};

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
		event.preventDefault();
		let name = $('.name').val();
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