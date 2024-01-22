// List of questions and answers
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Highly Textured Makeup Language", "Hyper Transfer Markup Language", "Hyper Technical Modern Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Java", "Python", "JavaScript", "C#"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is the purpose of the CSS `box-sizing` property?",
        options: ["Adjusts the spacing between elements", "Specifies the layout model", "Defines how the width and height of an element are calculated", "Sets the background color of an element"],
        correctAnswer: "Defines how the width and height of an element are calculated"
    },
    {
        question: "In JavaScript, what is a closure?",
        options: ["A way to style HTML elements", "A function that has access to variables from its outer (enclosing) scope", "A type of loop", "A way to organize code into classes"],
        correctAnswer: "A function that has access to variables from its outer (enclosing) scope"
    },
    {
        question: "What does the acronym API stand for?",
        options: ["Application Programming Interface", "Automated Programming Interface", "Advanced Program Integration", "Application Process Interface"],
        correctAnswer: "Application Programming Interface"
    },
    {
        question: "Which version control system is widely used in open-source projects and allows for distributed development?",
        options: ["Subversion", "Git", "Mercurial", "CVS"],
        correctAnswer: "Git"
    },
    {
        question: "What is the purpose of the `localStorage` object in web development?",
        options: ["To store data on the server", "To store data on the client's computer", "To validate form inputs", "To create animations"],
        correctAnswer: "To store data on the client's computer"
    },
    {
        question: "Which method is used to pause the execution of a JavaScript function for a specified number of milliseconds?",
        options: ["wait()", "sleep()", "pause()", "setTimeout()"],
        correctAnswer: "setTimeout()"
    },
];

// Global variables
var currentQuestionIndex = 0;
var timer;
var timeRemaining = 60; // Initial time in seconds
var userScore = 0;

// Elements
var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question-container");
var timerDisplay = document.getElementById("timer");
var questionDisplay = document.getElementById("question");
var optionsDisplay = document.getElementById("options");
var nextButton = document.getElementById("next-button");
var endContainer = document.getElementById("end-container");
var finalScoreDisplay = document.getElementById("final-score");
var userInitialsInput = document.getElementById("user-initials");
var submitButton = document.getElementById("submit-button");

// Event listener for start button click
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    questionContainer.style.display = "block";
    timerDisplay.textContent = timeRemaining;

    // Start the timer
    timer = setInterval(function() {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        // Check if time is up
        if (timeRemaining <= 0 || currentQuestionIndex === questions.length) {
            endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion();
}

function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;

    // Display options
    optionsDisplay.innerHTML = "";
    currentQuestion.options.forEach(function(option, index) {
        var button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", function() {
            checkAnswer(option);
        });
        optionsDisplay.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex];

    // Check if the answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
        userScore++;
    } else {
        // Subtract time if the answer is incorrect
        timeRemaining -= 10;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if it's the last question
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        // Display the next question
        displayQuestion();
    }
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.style.display = "none";
    endContainer.style.display = "block";
    finalScoreDisplay.textContent = userScore;
}

submitButton.addEventListener("click", saveScore);

function saveScore() {
    var userInitials = userInitialsInput.value;
    // Save the userInitials and userScore to storage or perform other actions
    console.log("User Initials:", userInitials);
    console.log("User Score:", userScore);
}
