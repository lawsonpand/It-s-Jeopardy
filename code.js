//Global Variables
let gameQuestions = [];
let score = 0;
let yourAnswer = String();

// To Fetch the data needed for categories, questions, and answers
function getQuestions() {
  fetch("https://jservice.io/api/random")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let randomQuestion = data[Math.floor(Math.random(gameQuestions.length))];
      console.log(randomQuestion);
      let randomCategoryID = randomQuestion.category_id;
      console.log(randomCategoryID);
      fetch(`http://jservice.io/api/clues?category=${randomCategoryID}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          gameQuestions = data;
          displayQuestions();
          //  gameAnswers = (data)
          console.log(gameQuestions);
          //gameQuestions.push(data);
        });
    });
}

// the start the game screen displayed and the game begins
document.getElementById("startButton").addEventListener("click", getQuestions);

// The game-screen is displayed - it contains the title "It's Jeopardy", the "Category" section,
// the "Score" section, the Trivia "question" section, the "Your Answer Please" (input) section
// with a submit button
function displayQuestions() {
  document.querySelector(
    "#category"
  ).innerHTML = `${gameQuestions[length].category.title}`;

  document.querySelector(
    "#triviaQuestion"
  ).innerHTML = `${gameQuestions[length].question}`;
  document.querySelector("#contestantScore").innerHTML = `${score}`;

  document.querySelector(".startTheGame-screen").style.display = "none";
  // the board game screen appear
  document.querySelector(".game-screen").style.display = "block";

  document.querySelector(".gameOver-screen").style.display = "none";
}

document
  .getElementById("submitAnswer")
  .addEventListener("click", contestantRespond);

// Check to see if Your answer is the same as the answer to Quesition
function contestantRespond() {
  // You can enter your answer lowercase, uppercase, and both
  yourAnswer = document.querySelector("#contestantAnswer").value;
  yourAnswer = yourAnswer.toLowerCase();
  let gameAnswer = gameQuestions[length].answer.toLowerCase();

  // if your answer is correct: 1) you be get 1 point, 2) It will display "You're Correct"
  // on the screen for 3 second and 3) You will be sent back to the getQuestion function
  // for the next Trivia question
  if (yourAnswer === gameAnswer) {
    score += 1;
    document.querySelector("#contestantScore").innerHTML = `${score}`;
    document.querySelector("#contestantAnswer").value = "";
    document.querySelector(".correctAnswer").style.display = "block";
    setTimeout(() => {
      document.querySelector(".correctAnswer").style.display = "none";
    }, 3000);
    getQuestions();

    // if your answer is incorrect: 1) Your score will go back to ZERO(0), 2) You will be sent to
    // the game over screen" that says "Your Answer is Incorrect" "Game Over".
  } else {
    score = 0;
    document.querySelector("#contestantScore").innerHTML = `${score}`;
    document.querySelector("#contestantAnswer").value = "";
    document.querySelector(".game-screen").style.display = "none";
    document.querySelector(".gameOver-screen").style.display = "block";
  }
}
// In game over screen you can select the "Want to Play Again" to go back to the game-screen
// and play again.
document.getElementById("playAgain").addEventListener("click", getQuestions);
// or you can select the "Exit the Game" to go back to the start the game screen.
document.getElementById("exitGame").addEventListener("click", function () {
  document.querySelector(".gameOver-screen").style.display = "none";
  document.querySelector(".startTheGame-screen").style.display = "block";
});
