const questions = [
    {
        question: "What does 'HTML' stand for?",
        answers: [
            { text: "Hyper Text Media Link", correct: false},
            { text: "High Tech Memory Link", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "How Text Makes Language", correct: false},
        ]
    },
    {
        question: "What is 'Const' short for?",
        answers: [
            { text: "Constrain", correct: false},
            { text: "Constant", correct: true},
            { text: "Construction", correct: false},
            { text: "Constitution", correct: false},
        ]
    },
    {
        question: "A String Element lies between what?",
        answers: [
            { text: "Commas", correct: false},
            { text: "Exclamation Points", correct: false},
            { text: "Question Marks", correct: false},
            { text: "Quotaion Marks", correct: true},
        ]
    },
    {
        question: "Which of the options below best represents a boolean data type?",
        answers: [
            { text: "Positive/Negative", correct: false},
            { text: "True/False", correct: true},
            { text: "In/Out", correct: false},
            { text: "Up/Down", correct: false},
        ]
    },
    {
        question: "A block of code that executes when something invokes/calls for it:",
        answers: [
            { text: "Boolean", correct: false},
            { text: "CSS", correct: false},
            { text: "Function", correct: true},
            { text: "HTML", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheet", correct: true},
            { text: "Constant Style Sheet", correct: false},
            { text: "Consistant Style Script", correct: false},
            { text: "Constant Styling Sheet", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("corrrect");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "play again";
        nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();

const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");

let timeLeft = 60; // Total time in seconds
let timerId;

function startTimer() {
  timerId = setInterval(updateTimer, 1000); // Update timer every second
  startButton.disabled = true; // Disable the start button once the timer starts
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerId); // Stop the timer when it reaches 0
    timerElement.textContent = "Time's up!";
    startButton.disabled = false; // Enable the start button again
  }
}

startButton.addEventListener("click", startTimer);

function showScore() {
    clearInterval(timerId); // Stop the timer
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
  }