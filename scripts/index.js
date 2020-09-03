//Section list
const SECTION_LIST = document.querySelectorAll(".quiz-section");

//Start
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//Quiz questions
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUSES = document.querySelectorAll(".choice-status");
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");

//End
const END_SECTION = document.getElementById("end");
const END_TITLE = document.getElementById("end-title");
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE = document.getElementById("submit-score");

//Questions
class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
const QUESTION_1 = new Question("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
const QUESTION_2 = new Question("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
const QUESTION_3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
const QUESTION_4 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
const QUESTION_5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
const QUESTION_LIST = [QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5];

let currentQuestion = 0;

let totalTime = 60;
let totalTimeInterval;
let choiceStatusTimeout; 

//start the game
START_BTN.addEventListener('click', function() {
  showElement(SECTION_LIST, QUIZ_SECTION);
  
  displayTime();  
  displayQuestion();

  startTimer();
});

function showElement(siblingList, showElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  showElement.classList.remove("hidden");
} 

function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

function displayTime() {
  TIME_REMAINING.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

function displayQuestion() {
  QUESTION.textContent = QUESTION_LIST[currentQuestion].question;

  displayChoiceList();
}

function displayChoiceList() {
  CHOICES.innerHTML = "";

  QUESTION_LIST[currentQuestion].choices.forEach(function(answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    CHOICES.appendChild(li);
  });
}

CHOICES.addEventListener('click', function(event) {
  clearTimeout(choiceStatusTimeout);
  styleTimeRemainingDefault();

  if (event.target.parentElement.dataset.index != QUESTION_LIST[currentQuestion].indexOfCorrectChoice) {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(CHOICE_STATUSES, WRONG);

    choiceStatusTimeout = setTimeout(function() {
      hideElement(WRONG);
      styleTimeRemainingDefault();
    }, 1000);
  } else {
    showElement(CHOICE_STATUSES, CORRECT);

    choiceStatusTimeout = setTimeout(function() {
      hideElement(CORRECT);
    }, 1000);
  }

  currentQuestion++;
  if (currentQuestion >= QUESTION_LIST.length) {
    endGame();
  } else {
    displayQuestion();
  }
});

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function styleTimeRemainingDefault() {
  TIME_REMAINING.style.color = "#4616E8";
}

function styleTimeRemainingWrong() {
  TIME_REMAINING.style.color = "#E81648";
}

function endGame() {
  clearInterval(totalTimeInterval);
  showElement(SECTION_LIST, END_SECTION);
  SCORE.textContent = totalTime;

  if (totalTime === 0) {
    END_TITLE.textContent = "Sorry! You ran out of time!";
  } else {
    END_TITLE.textContent = "Congratulations! You answered all the questions before your time ran out!";
  }
}


SUBMIT_SCORE.addEventListener('submit', function(event){
  event.preventDefault();

  //get the local storage highscore stuff
  let currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    currentScores = JSON.parse(currentScores);
    // console.log(currentScores);
  } else {
    currentScores = [];
  }
  //if there aint none, make a new array and push
  const userScore = {
    intials: INITIALS_INPUT.value,
    score: totalTime,
  }
  
  let userScoreIndex = currentScores.length;
  if (currentScores.length > 0) {
    for (let i = 0; i < currentScores.length; i++) {
      if (currentScores[i].score <= userScore.score) {
        userScoreIndex = i;
        break;
      }
    } 
  } 

  currentScores.splice(userScoreIndex, 0, userScore);

  localStorage.setItem('scoreList', JSON.stringify(currentScores));
  
  window.location.href= "./highscores.html";
});





