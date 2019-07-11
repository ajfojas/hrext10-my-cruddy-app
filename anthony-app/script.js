//localStorage functions
let storeChoice = function(key, value) {
  return window.localStorage.setItem(key, value);
}

let clearDatabase = function() {
  return window.localStorage.clear();
}

let showDatabase = function() {
  $('tbody').html('');

  for (let i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    let value = JSON.parse(window.localStorage.getItem(key));
    $('tbody').append(`<tr><td>${key}</td><td>${value[0]}</td><td>${value[1]}</td><td>${value[2]}</td></tr>`)
  }
}

$(document).ready(function() {
  

  showDatabase();



  let value = [];
  
  let botChoice = function() {
  	let choices = ["Rock", "Paper", "Scissors"];
  	let randomIndex = Math.floor(Math.random() * choices.length);
  	return choices[randomIndex];
  };

  $('.button-rock').on("click", function() {
  	value.push("Rock");
  	let botAnswer = botChoice();
  	value.push(botAnswer);
  	if(botAnswer === "Rock") {
  		value.push("Draw");
  	} else if(botAnswer === "Paper") {
  		value.push("Lose");
  	} else if(botAnswer === "Scissors") {
  		value.push("Win");
  	}
    storeChoice(window.localStorage.length + 1, JSON.stringify(value));
    

    showDatabase();


    value = [];
  });

  $('.button-paper').on("click", function() {
  	value.push("Paper");
  	let botAnswer = botChoice();
  	value.push(botAnswer);
  	if(botAnswer === "Rock") {
  		value.push("Win");
  	} else if(botAnswer === "Paper") {
  		value.push("Draw");
  	} else if(botAnswer === "Scissors") {
  		value.push("Lose");
  	}
    storeChoice(window.localStorage.length + 1, JSON.stringify(value));
    

    showDatabase();


    value = [];
  });

  $('.button-scissors').on("click", function() {
  	value.push("Scissors");
  	let botAnswer = botChoice();
  	value.push(botAnswer);
  	if(botAnswer === "Rock") {
  		value.push("Lose");
  	} else if(botAnswer === "Paper") {
  		value.push("Win");
  	} else if(botAnswer === "Scissors") {
  		value.push("Draw");
  	}
    storeChoice(window.localStorage.length + 1, JSON.stringify(value));
    

    showDatabase();


    value = [];
  });

  $('.button-clear').click(function() {
    if (confirm("WARNING: This will clear your record.\nTHIS ACTION CANNOT BE UNDONE")) {
      clearDatabase();
      

      showDatabase();


    }
  })
});