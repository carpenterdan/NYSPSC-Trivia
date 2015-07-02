//Dan Carpenter, 6/30/2015

//declaring global variables

	var numCorrect;  //keeps track of how many questions the user has correctly answered
	var questionNumber;  //the number of the current question
	var q;  //variable to hold the question, returned by SetMatrix
	
	//Set of variables that are initialized to 0 and change to 1 to indicate that a question of 
	//a specific category has been found.  Used in SetMatrix.
	var waterFound;
	var elecFound;
	var gasFound;
	var phoneFound;
	var miscFound;
	
	var hardWaterFound;
	var hardElecFound;
	var hardGasFound;
	var hardPhoneFound;
	
	var timer;  //timer variable for the "Still There?" popup after a user is inactive for 30s
	var categoryTracker;  //used to tell LightUpIcon what the current question's category is
	var audio;  //the audio file that is used on the Congratulations screen
	
	DisableButtons();
	
	
	
	/**
	Initializes variables and begins the game
	*/
	$("#playButton").click(function() {
		
		$(".reset").hide();
		$(".continue").hide();
		$(".continue").css("opacity", "1");
		$("#showAttendant").hide();
		
		$(".waterbadge").hide();
		$(".electricitybadge").hide();
		$(".gasbadge").hide();
		$(".phonebadge").hide();
		
		$("#playButton").prop("disabled", true);
		$("#CorrectScreen").css("opacity", "1");
		$("#WrongScreen").css("opacity", "1");
		$("#Congratulations").css("opacity", "1");
		$("#Sorry").css("opacity", "1");
		$(".congratstext").show();
		$("#Congratulations").css("top", "0");
		
		//reset pieces of NYS to be dark again
		$(".nys1").css("opacity", "0.3");
		$(".nys2").css("opacity", "0.3");
		$(".nys3").css("opacity", "0.3");
		$(".nys4").css("opacity", "0.3");
		$(".nys4").css("opacity", "0.3");
		$(".nys5").css("opacity", "0.3");
		$(".nys6").css("opacity", "0.3");
		
		//stop animation on the NYS pieces
		$(".nyPieces").css("animation-name", "");
		
		//when the user clicks play, the home screen fades out, the game screen fades in, and the game runs as usual
		$("#HomeScreen").fadeOut();
		$("#MainGameScreen").fadeIn();
		
		//variable to keep track of how many correct answers the user has selected
		numCorrect = 0;
		
		waterFound = 0;
		elecFound = 0;
		gasFound = 0;
		phoneFound = 0;
		miscFound = 0;
		hardWaterFound = 0;
		hardElecFound = 0;
		hardGasFound = 0;
		hardPhoneFound = 0;
		questionNumber = 0;
		SetUpQuestions();
		q = SetMatrix();
		FitText(q);
		StartTimer();		
		
		//delay the ability to click a button for 1 second
		setTimeout(EnableButtons, 400);
	});	
	

	
	/**
	Plays a sound file.
	*/
	function playSound(file) {
		var audio = document.createElement('audio');
		audio.src = file;
		audio.load();
		audio.play();
	}
		
	
	
	/**
	When an answer is clicked, the timer is stopped, all answer buttons are disabled so that a user cannot click
	multiple answers, the continue button is enabled and appears so that the user can move forward in the game, 
	and if the user answered correctly they are taken to the Correct screen, otherwise they are taken to the 
	Incorrect screen.  The variable numCorrect is also incremented if the user answered correctly.
	*/
	function AnswerClicked(buttonNumber) {
		$("#rectangle").stop();
		DisableButtons();
		
		//enables the continue button
		$(".continue").prop("disabled", false);
		
		$("#MainGameScreen").fadeOut();
		//determine if their answer was correct or incorrect
		if(q.correct == buttonNumber) {
			AdjustExplanation();
			$("#CorrectScreen").fadeIn();
			$(".continue").delay(200).fadeIn();
			categoryTracker = q.category;
			StillPlaying();
			numCorrect++;
		}
		else {
			//wrong screen
			AdjustExplanation();
			$("#WrongScreen").fadeIn();
			$(".continue").delay(200).fadeIn();
			StillPlaying();
		}
		LightUpNYS();
		ShowBadges();
	}
		
		
	/**
	The user clicked on one of the four possible answers.
	*/
	$("#DivChoice1").click( function() {
		AnswerClicked(1);
	});
	$("#DivChoice2").click( function() {
		AnswerClicked(2);
	});
	$("#DivChoice3").click( function() {
		AnswerClicked(3);
	});
	$("#DivChoice4").click( function() {
		AnswerClicked(4);
	});
	
	
	
	/**
	Adjusts the explanation that appears on the Correct or Incorrect screens so that it explains why 
	the correct answer is correct.  Also changes font size of the explanation based on the length of the
	explanation.
	*/
	function AdjustExplanation() {
		var explanation = "[Explanation of why the correct answer is correct goes here ]";
		$(".explanation").html(explanation);
		//changes size of the text on the correct/wrong screen
		if($(".explanation").html().length > 125 && $(".explanation").html().length < 250) {
			$(".explanation").css("font-size","150%");
		}
		else if($(".explanation").html().length >= 250) {
			$(".explanation").css("font-size","130%");
		}
	}
	
	
	
	/**
	When difficult questions are correctly answered, this function lights up the badge corresponding to the category
	of the question that was answered correctly.
	*/
	function ShowBadges() {
		if(numCorrect > 6) {
			if(categoryTracker == "water") {
				$(".waterbadge").show();
			}
			if(categoryTracker == "elec") {
				$(".electricitybadge").show();
			}
			if(categoryTracker == "gas") {
				$(".gasbadge").show();
			}
			if(categoryTracker == "phone") {
				$(".phonebadge").show();
			}
		}
	}
	
	
	
	/**
	The user clicked continue.  The continue button gets disabled after they click it once to prevent the user
	from skipping questions, and it cancels the countdown that makes the "Still Playing?" screen pop up.
	The question number is incremented and, depending on what the question number is, either a new question will
	appear or the game will take you to the Congratulations or Sorry screen.  On the Congratulations screen, after
	showing a "Congrats, you won" message for 7 seconds, the filled NYS shifts down, this message disappears, and
	a "Please show attendant" message appears at the top.  After another 30 seconds, the Reset button appears.
	*/
	//making the screen reload after going to the correct/wrong screen
	$(".continue").click( function() {
		//disables continue button after it's clicked once
		$(".continue").prop("disabled", true);
		
		//cancels the inactive countdown
		clearTimeout(countdown);
		
		questionNumber++;
		$("#WrongScreen").fadeOut();
		$("#CorrectScreen").fadeOut();
		$(".continue").fadeOut();
		
		//checks to see how many questions have been answered
		//on the tenth question the game will check how many correct answers the user has
		//and will send them to the winning or losing screen based on that number
		if(questionNumber > 9) {
			if(numCorrect > 5) {
				//send the user to the winning screen
				var title = GetTitle();
				$("#congratsMessage").html("You answered " + numCorrect + 
					" questions correctly!  That makes you " + title + "!");
				ShowBadges();
				$("#Congratulations").fadeIn();
				playSound('sounds/cheering.mp3');
				setTimeout(function() {
					$(".congratstext").fadeOut();
					$("#Congratulations").animate({top: "200px"}, 600);
					$("#showAttendant").delay(500).fadeIn();
				}, 7000);
				$(".reset").delay(30000).fadeIn();
			}
			else {
				//send the user to the losing screen
				$("#sorryMessage").html("You answered " + numCorrect + 
					" questions correctly, but you needed 6 to win.");
				$("#Sorry").fadeIn();
				$(".reset").fadeIn();
			}
		}
		else {
			CheckStatus();
			$("#MainGameScreen").fadeIn();
		}
	});
	
	

	/**
	The user clicked reset.  This fades out all possible end screens (Congrats & Sorry) and brings up the Home Screen.
	*/
	$(".reset").click( function() {
		$(".reset").fadeOut();
		$("#showAttendant").fadeOut();
		$("#Congratulations").fadeOut();
		$("#Sorry").fadeOut();
		$("#HomeScreen").fadeIn();
		$("#playButton").prop("disabled", false);
		//ONLY NEED THIS FOR LONGER SOUNDS audio.pause();
	});
	
	
	
	/**
	The timer starts each time at a width of 800px and, after a short delay, gets smaller and smaller
	until it disappears after 30 seconds.  At this time, the "Timed Out" popup appears and the game screen fades
	out.  Clicking Next on this popup will take the user to the Incorrect screen, or they will be sent there
	automatically after 15 seconds.
	*/
	function StartTimer() {
	//ensures that the timer is always reset to 800px
	$("#rectangle").css("width", "800px");
	$("#rectangle").css("border", "1px #afa496 groove");
	
	//do we want this to delay?
	$("#rectangle").delay(300).animate({width: "0"},30000, function() {
		$("#rectangle").css("border", "0 black groove");
		$(".timedOut").fadeIn(800);
		$(".gamescreen").animate({opacity: "0.5"});
		$(".next").prop("disabled",false);
		DisableButtons();
		NextScreenCountdown();
		});
	}
	
	
	
	
	/**
	The user clicked next.  Next immediately becomes disabled so that the user cannot click it multiple times,
	and the "Timed Out" popup fades out.  Finally, the Incorrect Screen fades in.
	*/
	$(".next").click( function() {
		$(".next").prop("disabled",true);
		$(".timedOut").fadeOut();
		$(".gamescreen").animate({opacity: "1"});
		$("#MainGameScreen").fadeOut();
		
		StillPlaying();
		//enables the continue button
		$(".continue").fadeIn();
		$(".continue").prop("disabled", false);
		
		AdjustExplanation();
		$("#WrongScreen").delay(300).fadeIn();
		clearTimeout(timer);
	});
	
	
	
	
	/**
	Timed function that automatically moves the user on from the "Timed Out" popup to the Incorrect Screen 
	after 15 seconds regardless of whether they clicked Next.
	*/
	function NextScreenCountdown() {
		//gives the user 15 seconds to click next, or the incorrect screen comes up anyway
		timer = setTimeout(function() {
			$(".next").prop("disabled",true);
			$(".timedOut").fadeOut();
			$(".gamescreen").animate({opacity: "1"});
			$("#MainGameScreen").fadeOut();
			
			//enables the continue button
			$(".continue").prop("disabled", false);
			$(".continue").delay(200).fadeIn();
			
			AdjustExplanation();
			StillPlaying();
			$("#WrongScreen").delay(300).fadeIn();
		}, 15000);
	}
	
	
	
	/**
	If the user is inactive for 30 seconds on either the Correct or Incorrect screen, they are given
	a message that asks them if they are still playing.  They can click Continue to keep playing, or if they 
	remain inactive for 30 more seconds the game aborts and takes them back to the Home Screen.
	*/
	function StillPlaying() {
		countdown = setTimeout(function() {
			$(".continue").prop("disabled", true);
			$(".countdown").fadeIn();
			$(".gamescreen").animate({opacity: "0.5"});
			$("#CorrectScreen").animate({opacity: "0.3"});
			$("#WrongScreen").animate({opacity: "0.3"});
			$(".continue").animate({opacity: "0.3"});
			$("#Congratulations").animate({opacity: "0.3"});
			$("#Sorry").animate({opacity: "0.3"});
			
			finalTimer = setTimeout(function() {
				$(".countdown").fadeOut();
				$(".gamescreen").animate({opacity: "1"});
				$("#WrongScreen").fadeOut();
				$("#CorrectScreen").fadeOut();
				$(".continue").fadeOut();
				$("#Congratulations").fadeOut();
				$("#Sorry").fadeOut();
				$("#HomeScreen").fadeIn();
				$("#playButton").prop("disabled", false);
			}, 30000);
		}, 30000);
		
		
	}
	
	
	
	/**
	If the user receives the "Still Playing?" alert and they click Continue, the game takes them either to the next 
	question or to the Congratulations or Sorry screen.
	*/
	$(".keepPlaying").click( function() {
		$(".countdown").fadeOut();
		$(".gamescreen").css("opacity", "1");
		$("#CorrectScreen").css("opacity", "1");
		$("#WrongScreen").css("opacity", "1");
		$(".continue").css("opacity", "1");
		$(".continue").fadeOut();
		$("#Congratulations").css("opacity", "1");
		$("#Sorry").css("opacity", "1");

		//cancels the inactive countdown
		clearTimeout(countdown);
		clearTimeout(finalTimer);
		
		questionNumber++;
		$("#WrongScreen").fadeOut();
		$("#CorrectScreen").fadeOut();
		
		//checks to see how many questions have been answered
		//on the tenth question the game will check how many correct answers the user has
		//and will send them to the winning or losing screen based on that number
		if(questionNumber > 9) {
			if(numCorrect > 5) {
				//send the user to the winning screen
				$("#Congratulations").fadeIn();
			}
			else {
				//send the user to the losing screen
				$("#Sorry").fadeIn();
			}
		}
		else {
			CheckStatus();
			$("#MainGameScreen").fadeIn();
		}
		
	});
	
	
	
	/**
	Before the user gets 6 questions correct, this function randomly selects and returns a question from the 
	normal list of questions.  After the user gets at least 6 questions correct, this function randomly selects 
	a question from the list of difficult questions.
	*/
	function GetQuestion() {
		var questionFound = false;
		var num;
		while(questionFound == false) {
			//if they don't have at least 6 correct, they are playing with normal questions and don't earn badges
			if(numCorrect < 6) {
				//generate a random number
				num = Math.floor((Math.random() * questions.length) + 1) - 1;
				
				//based on the random number, we assign that associative array to the variable question
				//this is the actual question associated with the array entry in questions at position 'num'
				question = questions[num];
				
				if(question.used != 1) {
					questionFound = true;
				}
			}
			else {
				//generate a random number
				num = Math.floor((Math.random() * hardQuestions.length) + 1) - 1;
				
				//based on the random number, we assign that associative array to the variable question
				//this is the actual question associated with the array entry in questions at position 'num'
				question = hardQuestions[num];
				
				if(question.used != 1) {
					questionFound = true;
				}
			}
		}
		ResetCategory();
		LightUpIcon(question);
		return question;
	}
	
	
	
	/**
	Lights up the pieces of NYS shown on the Correct, Incorrect, Congratulations, and Sorry screens
	according to how many questions the user has correctly answered.
	*/
	function LightUpNYS() {
		if(numCorrect == 1) {
			$(".nys1").css("opacity", "1");
		}
		else if(numCorrect == 2) {
			$(".nys2").css("opacity", "1");
		}
		else if(numCorrect == 3) {
			$(".nys3").css("opacity", "1");
		}
		else if(numCorrect == 4) {
			$(".nys4").css("opacity", "1");
		}
		else if(numCorrect == 5) {
			$(".nys5").css("opacity", "1");
		}
		else if(numCorrect >= 6) {
			$(".nys6").css("opacity", "1");
		}
	}
	
	
	
	/**
	Depending on what the question category is, this function lights up the corresponding icon and displays
	the corresponding category label.  If the question category is miscellaneous, then all four icons are lit up
	and no labels are displayed.
	*/
	function LightUpIcon(localq) {
		if(localq.category == "water") {
			$("#water").css("opacity", "1");
			$("#waterlabel").css("visibility", "visible");
		}
		else if(localq.category == "elec") {
			$("#electricity").css("opacity", "1");
			$("#electricitylabel").css("visibility", "visible");
		}
		else if(localq.category == "gas") {
			$("#gas").css("opacity", "1");
			$("#gaslabel").css("visibility", "visible");
		}
		else if(localq.category == "phone") {
			$("#phone").css("opacity", "1");
			$("#phonelabel").css("visibility", "visible");
		}
		else if(localq.category == "misc") {
			$("#water").css("opacity", "1");
			$("#electricity").css("opacity", "1");
			$("#gas").css("opacity", "1");
			$("#phone").css("opacity", "1");
		}
	}
	
	
	
	/**
	Depending on how many questions have been answered correctly, changes the user's title.
	*/
	function GetTitle() {
		if (numCorrect == 6) {
			return "a well-informed consumer";
		}
		else if (numCorrect == 7) {
			return "a knowledgeable consumer";
		}
		else if (numCorrect == 8) {
			return "a great consumer";
		}
		else if (numCorrect == 9) {
			return "a utility expert";
		}
		else {
			return "a utility superstar";
		}
	}
	
	
	
	/**
	Resets the icons and labels on the question screen so that the game does not 'remember' the previous 
	question category.  This ensures that LightUpIcon always lights up only the icon that corresponds to the 
	current question.
	*/
	function ResetCategory() {
		$("#water").css("opacity", "0.3");
		$("#electricity").css("opacity", "0.3");
		$("#gas").css("opacity", "0.3");
		$("#phone").css("opacity", "0.3");
		$(".label").css("visibility", "hidden");
	}
	
	
	
	/**
	Creates a random permutation of the elements in A using Knuth's shuffle algorithm.  This is used to 
	arrange the answers randomly.
	*/
	function Shuffle(A) { 
		   var j, k, temp;
           for (j=A.length-1 ; j>0 ; j--)
           { 
		       k = Math.floor(Math.random()*(j+1));
			   // swap A[j] and A[k]
			   temp = A[j]; A[j] = A[k] ; A[k] = temp;
		   }
           return A;
	   }
	   
	   
	   
	/**
	Using the Shuffle function, this randomly arranges the answers into the four answer buttons, keeps track
	of which button contains the correct answer, and displays the answers.
	*/
	function ArrangeAnswers(localq){
		//array that stores the 3 wrong answers and the correct answer
		var answers = [localq.other1, localq.other2, localq.other3, localq.answer];
		
		Shuffle(answers);
		
		var i = answers.indexOf('All are correct');
		
		if (i != -1) {
		answers[i] = answers[3];
		answers[3] = 'All are correct';
		}
		
		i = answers.indexOf('None are correct');
		
		if (i != -1) {
		answers[i] = answers[3];
		answers[3] = 'None are correct';
		}
		
		//display answers and keeps track of where the correct answer is
		localq.correct = answers.indexOf(localq.answer) + 1;
		$("#DivChoice1").html(answers[0]);
		$("#DivChoice2").html(answers[1]);
		$("#DivChoice3").html(answers[2]);
		$("#DivChoice4").html(answers[3]);
	}
	
	
	
	/**
	Disables all answer buttons so that the user cannot answer multiple times per question.
	*/
	function DisableButtons() {
		$("#DivChoice1").prop("disabled",true);
		$("#DivChoice2").prop("disabled",true);
		$("#DivChoice3").prop("disabled",true);
		$("#DivChoice4").prop("disabled",true);
	}
	
	
	
	/**
	Re-enables all answer buttons so that they can be used in the next question.
	*/
	function EnableButtons() {
		$("#DivChoice1").prop("disabled",false);
		$("#DivChoice2").prop("disabled",false);
		$("#DivChoice3").prop("disabled",false);
		$("#DivChoice4").prop("disabled",false);
	}
	
	
	
	/**
	Calls GetQuestion to randomly get a question.  For the first five questions that the user gets,
	1 is water, 1 is electric, 1 is gas, 1 is phone, and 1 is miscellaneous.  To make sure that the user
	gets one of each category, the function keeps getting new questions until it has found a question that
	has a category that has not yet been used.  After the first five questions, the remaining questions are
	randomly chosen.  However, once the user gets 6 questions correct, the game gives them a difficult question
	from each category.
	*/
	function SetMatrix() {
		//assigns the question array returned by GetQuestion to the variable q
		var localq = GetQuestion();
		var keepSearching = true;
		//giving the user 1 water, 1 electric, 1 gas, 1 phone, 1 misc for the first 5 questions
		if(questionNumber < 5) {
			while(keepSearching == true) {
				if(localq.category == "water" && waterFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					waterFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "elec" && elecFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					elecFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "gas" && gasFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					gasFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "phone" && phoneFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					phoneFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "misc" && miscFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					miscFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				//gets another question and reruns the while loop to look for a new question
				else {
					localq = GetQuestion();
				}
			}
		}
		//giving the player one of each difficult question category
		else if(numCorrect > 5) {
			while(keepSearching == true) {
				if(localq.category == "water" && hardWaterFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					hardWaterFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "elec" && hardElecFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					hardElecFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "gas" && hardGasFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					hardGasFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				else if(localq.category == "phone" && hardPhoneFound == 0) {
					ArrangeAnswers(localq);
					keepSearching = false;
					hardPhoneFound = 1;
					//marks the question as used so that it won't be repeated
					localq.used = 1;
				}
				//gets another question and reruns the while loop to look for a new question
				else {
					localq = GetQuestion();
				}
			}
		}
		else {
			ArrangeAnswers(localq);
			//marks the question as used so that it won't be repeated
			localq.used = 1;
		}
		$("#questionText").html(localq.question);
		return localq;
	}
	
	
	
	/**
	Changes the size of question and answer text depending on the length of the string.
	*/
	function FitText(q) {
		if(q.question.length > 80) {
			$("#questionText").css("font-size", "300%");
		}
		else {
			$("#questionText").css("font-size", "350%");
		}
		
		if(q.other1.length > 25 || q.other2.length > 25 || q.other3.length > 25 || q.answer.length > 25) {
			$(".answer").css("font-size", "200%");
		}
		else {
			$(".answer").css("font-size", "300%");
		}
	}
	
	
	
	/**
	Makes sure that the user plays only 10 questions.  While they still have questions to answer, 
	this function gets them a new question with SetMatrix, fits the text, enables the answer buttons, 
	and starts the timer.
	*/
	function CheckStatus() {
		if (questionNumber < 10){
			q = SetMatrix();
			FitText(q);
			EnableButtons();
			//can we delay the timer starting again?
			StartTimer();
		}
	}
