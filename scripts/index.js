//Start
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//Quiz questions
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUS = document.getElementById("choice-status");

//End
const END_SECTION = document.getElementById("end");
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE_BTN = document.getElementById("submit-score");

class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
const QUESTION_1 = new Question("Something", ["option1", "option2", "option3"], 2);

//when you press the start button
START_BTN.addEventListener('click', function() {
  START_SECTION.classList.add("hidden");
  QUIZ_SECTION.classList.remove("hidden");

  QUESTION.textContent = QUESTION_1.question;
  QUESTION_1.choices.forEach(function(element, index) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + element;
    li.appendChild(button);
    CHOICES.appendChild(li);
  });
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



