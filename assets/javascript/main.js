$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Which car set a record for most expensive car sold at auction in 2018 selling for $48.4 million?",
	    choices: ["1962 Ferrari 250 GTO", "Aston Martin DBR1", "Jaguar D Type", "Mclaren F1"],
	    correctAnswer: "1962 Ferrari 250 GTO",
	    image: "<img src='assets/images/1962ferrari.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What does STI stand for on the Subaru WRX STI?",
	    choices: ["Subaru Technical Innovation", "Subaru Team International", "Subaru Tecnica international", "Sexually Transmitted Infection"],
	    correctAnswer: "Subaru Tecnica international",
	    image: "<img src='assets/images/subarusti.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What is the fastest production car in the world (2018) with a top speed of 278 Mph?",
	    choices: ["Hennessey Venom GT", "Koenigsegg Agera RS", "Bugatti Chiron", "Bugatti Veyron"],
	    correctAnswer: "Koenigsegg Agera RS",
	    image: "<img src='assets/images/agerars.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "How Wide is the rear wing on the 2017 Dodge Viper ACR in cm?",
	    choices: ["1099", "1356", "2129", "1776"],
	    correctAnswer: "1776",
	    image: "<img src='assets/images/viperacr.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What car set the fastest production car lap time around the Nurburing in 2018?",
	    choices: ["2018 Porsche 911 GT2 RS", "2018 Lamborghini Huracan Performante", "2018 Lamborghini Aventador SVJ", "2014 Porsche 918 Spyder"],
	    correctAnswer: "2018 Lamborghini Aventador SVJ",
	    image: "<img src='assets/images/lambo.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Which car line has sold more than 40 million cars, making it the best seller in history?",
	    choices: ["Volkswagen Golf", "Honda Accord", "Ford F-series", "Toyota Corolla"],
	    correctAnswer: "Toyota Corolla",
	    image: "<img src='assets/images/corolla.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "What JDM car is reffered to as godzilla?",
	    choices: ["Nissan GTR", "Mazda Rx7", "Toyota Supra", "Acura NSX"],
	    correctAnswer: "Nissan GTR",
	    image: "<img src='assets/images/godzilla.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "What Italian car manufactur sells a car named after California?",
	    choices: ["Lamborghini", "Fiat", "Ferrari", "Alpha Romeo"],
	    correctAnswer: "Ferrari",
	    image: "<img src='assets/images/california.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Which car brand has been ranked coolest brand in the world more than 5 times?",
	    choices: ["Ferrari", "Aston Martin", "Lamborghini", "Porsche"],
	    correctAnswer: "Aston Martin",
	    image: "<img src='assets/images/am.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Which Car kicked off the hot hatch craze?",
	    choices: ["Lancia Delta HF Integrale", "Renault 5 Turbo", "Volkswagen Golf GTI", "Mini Cooper S"],
	    correctAnswer: "Volkswagen Golf GTI",
	    image: "<img src='assets/images/gti.jpg' class='img-circle shadow'>"
	  },
    
    ];

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Dominic Torreto and Brian O'Connor bow down to you";
			var bottomText = "#respect";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "You're like a Subway sandwich, nothing special.";
			var bottomText = "#nothingSpecial";
		}
		else {
			var endMessage = "I would be shocked if you knew how to drive a car.";
			var bottomText = "#ehhh";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}

	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();

		questionContent();
    	timer();
    	userTimeout();
    }


    $("#start").click(nextQuestion);

   
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});