var questions = [{
    question: "WHAT WORD IS SPELLED INCORRECTLY IN EVERY SINGLE DICTIONARY?",
    answers: ["CORRECTLY", "WISE", "INCORRECTLY"],
    correct: "INCORRECTLY"
},
{
    question: "WHAT GOES UP BUT NEVER EVER COMES DOWN?",
    answers: ["STAIRS", "ELEVATOR", "YOUR-AGE"],
    correct: "YOUR-AGE"
},
{
    question: " WHAT HAS A FACE AND TWO HANDS, BUT NO ARMS OR LEGS?",
    answers: ["A-SNACK", "A-CLOCK", "A-FISH"],
    correct: "A-CLOCK"
},
{
    question: "HOW MANY MONTHS HAVE 28 DAYS?",
    answers: ["ONE-MONTH","SIX-MONTHS", "ALL-MONTHS"],
    correct: "ALL-MONTHS"
},
{
    question: " EVERYONE IN THE WORLD NEEDS IT, BUT THEY USUALLY GIVE IT WITHOUT TAKING IT. WHAT IS IT?",
    answers: ["ADVICE", "CONFIDENCE", "OPINION"],
    correct: "ADVICE"
}
];


var score = 0;
var sizeQuestion = 0;
var timeLeft = 0;
var timer;

//Once clicking on starQuiz button the countdown timer starts.
function startQuiz() {
timeLeft = 60;

timer = setInterval(function() {
timeLeft--;
document.querySelector("#timeLeft").innerHTML = timeLeft;

//Ending the quiz when score reach zero or belwo.
 if (timeLeft <= 0) {
clearInterval(timer);
endGame(); 
}

}, 1000);

nextQuestion();
}

//Looping from first to last question. 
function nextQuestion() {
 if (sizeQuestion >= questions.length ) {
endGame();
return;
}

var bodyContent = "<h2>" + questions[sizeQuestion].question + "</h2>" 

//Loop for the three answers in the button
for (var i = 0; i < questions[sizeQuestion].answers.length; i++) {

    //CheckAnswer it will tagret correct and incorrect function to do its job.
    //PickAnswer it put the [answers] inside the button.
    var btn = "<button onclick=\"[checkAnswer]\">[pickAnswer]</button>"; 
    btn = btn.replace("[pickAnswer]", questions[sizeQuestion].answers[i]);

    //Checking users answers.
    if (questions[sizeQuestion].answers[i] == questions[sizeQuestion].correct) {
        btn = btn.replace("[checkAnswer]", "correct()");// go to correct fuction.
    } else {
        btn = btn.replace("[checkAnswer]", "incorrect()");// go to incorrect function.
    }
    //Add the pickAnswers [answers] button to the question and send it to the html at the end of the function.
    bodyContent += btn
}
    //Move from one question to another.
    sizeQuestion++;

    document.querySelector("#content").innerHTML = bodyContent;
}

// Deducting 5 seconds for each incorrect answer.
function incorrect() {
timeLeft -= 5; 
nextQuestion();
}

//Each correct answer will increase the score by 20 points.
function correct() {
score += 20;
nextQuestion();
}


//stop the timer to end the game. 
function endGame() {
clearInterval(timer);

var resultScore =`
<h1> Quiz Over! </h1>
<h2> ` + score +  ` /100!</h2>
<h2>  ` + score / 20 +  ` out of 5 questions correct!</h2>
<input type="text" id="initial" placeholder="Enter Your Initial"> 
<button onclick="setScore()">Final Score!</button>`;

document.querySelector("#content").innerHTML = resultScore;
}

//store the scores on local storage.
function setScore() {
localStorage.setItem("bestscore", score);
localStorage.setItem("bestscoreName", document.querySelector('#initial'). value);
getScore();
}


function getScore() {
var bodyContent = `
<h1>` + localStorage.getItem("bestscoreName") + ` Final Score is:</h1>
<h1>` + localStorage.getItem("bestscore") + `</h1>
<button onclick="resetGame()">Play Again!</button>`;

document.querySelector("#content").innerHTML = bodyContent;
}


//Sart a new game when press on (Start Again) button.

function resetGame() {
clearInterval(timer);
score = 0;
sizeQuestion = 0;
timeLeft = 0;
timer = null;

document.querySelector("#timeLeft").innerHTML = timeLeft;

var bodycontent = `
<h1>Welcome To Answer Smart Code Quiz</h1>
<h3>Are you ready to show your skills?</h3>
<h3>Lets Start Fun!</h3>
<button onclick="startQuiz()">Start Again</button>`;

document.querySelector("#content").innerHTML = bodycontent;
}
