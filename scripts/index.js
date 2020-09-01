//Section list
const SECTION_LIST = document.querySelectorAll("section");

//Start
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//Quiz questions
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const STATUS_LIST = document.querySelectorAll(".choice-status");
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");

//End
const END_SECTION = document.getElementById("end");
const END_TITLE = document.getElementById("end-title");
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE_BTN = document.getElementById("submit-score");

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
let timeInterval;
let statusTimer; 

//start the game
START_BTN.addEventListener('click', function() {
  
  showElement(SECTION_LIST, QUIZ_SECTION);
  
  displayTime();  
  displayQuestion();
  
  timeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
});

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

function showElement(siblingList, showElement) {
  for (element of siblingList) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }
  showElement.classList.remove("hidden");
} 

function displayTime() {
  TIME_REMAINING.textContent = totalTime;
}

function displayQuestion() {
  CHOICES.innerHTML = "";

  QUESTION.textContent = QUESTION_LIST[currentQuestion].question;

  QUESTION_LIST[currentQuestion].choices.forEach(function(element, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + element;
    li.appendChild(button);
    CHOICES.appendChild(li);
  });
}

CHOICES.addEventListener('click', function(event) {
  clearTimeout(statusTimer);
  TIME_REMAINING.style.color = "#4616E8";

  if (event.target.parentElement.dataset.index != QUESTION_LIST[currentQuestion].indexOfCorrectChoice) {
    totalTime -= 10;
    checkTime();
    displayTime();

    TIME_REMAINING.style.color = "#E81648";
    showElement(STATUS_LIST, WRONG);

    statusTimer = setTimeout(function() {
      if (!WRONG.classList.contains("hidden")) {
        WRONG.classList.add("hidden");
      }
      TIME_REMAINING.style.color = "#4616E8";
    }, 1000);
  } else {
    showElement(STATUS_LIST, CORRECT);

    statusTimer = setTimeout(function() {
      if (!CORRECT.classList.contains("hidden")){
        CORRECT.classList.add("hidden");
      }
    }, 1000);
  }

  currentQuestion++;
  if (currentQuestion >= QUESTION_LIST.length) {
    clearInterval(timeInterval);
    endGame();
  } else {
    displayQuestion();
  }
});

function endGame() {
  showElement(SECTION_LIST, END_SECTION);
  SCORE.textContent = totalTime;

  if (currentQuestion < QUESTION_LIST.length && totalTime === 0) {
    END_TITLE.textContent = "Sorry! You ran out of time!";
  } else {
    END_TITLE.textContent = "Congratulations! You answered all the questions before your time ran out!";
  }
}
//if user makes it to end of questions with time left
//or user runs out of time
  //allow user to enter initials and save their remaining time as score
  //save this to local storage
  //redirect to highscores page



