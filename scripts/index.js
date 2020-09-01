//Start
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//Quiz questions
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUS = document.getElementById("choice-status");
const STATUS_ICON = document.getElementById("status-icon");

//End
const END_SECTION = document.getElementById("end");
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

//when you press the start button
START_BTN.addEventListener('click', function() {
  START_SECTION.classList.add("hidden");
  QUIZ_SECTION.classList.remove("hidden");

  displayQuestion();
  timeInterval = setInterval(function() {
    totalTime--;
    TIME_REMAINING.textContent = totalTime;
    if (totalTime === 0) {
      clearInterval(timeInterval);
      QUIZ_SECTION.classList.add("hidden");
      END_SECTION.classList.remove("hidden");
    }
  }, 1000);
});


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
  if (event.target.parentElement.dataset.index != QUESTION_LIST[currentQuestion].indexOfCorrectChoice) {
    console.log(event.target.parentElement.dataset.index);
    console.log(QUESTION_LIST[currentQuestion].indexOfCorrectChoice);
    if (TIME_REMAINING.classList.contains("flash-red")) {
      TIME_REMAINING.classList.remove("flash-red");
    }
    totalTime -= 10;
    TIME_REMAINING.classList.add("flash-red");
    // CHOICE_STATUS.textContent = "Wrong!";
    // STATUS_ICON.classList.add("fa-times-circle");
    

    setTimeout(function() {
      TIME_REMAINING.classList.remove("flash-red");
      // CHOICE_STATUS.textContent = "";
      // STATUS_ICON.classList.remove("fa-times-circle");
    }, 3000);
  } else {
    // CHOICE_STATUS.textContent = "Correct!";
    // STATUS_ICON.classList.add("fa-check-circle");

    setTimeout(function() {
      // CHOICE_STATUS.textContent = "";
      // STATUS_ICON.classList.remove("fa-check-circle");
    }, 3000);
  }
  currentQuestion++;
  if (currentQuestion >= QUESTION_LIST.length) {
    clearInterval(timeInterval);
    QUIZ_SECTION.classList.add("hidden");
    END_SECTION.classList.remove("hidden");
  } else {
    displayQuestion();
  }
});
  //timer starts
  //display the question
  //display the options

//when user selects options
  //go to next question
  //if selection was wrong, deduct time, display "wrong" text
  //if selection was correct, display "correct" text

//if user makes it to end of questions with time left
//or user runs out of time
  //allow user to enter initials and save their remaining time as score
  //save this to local storage
  //redirect to highscores page



