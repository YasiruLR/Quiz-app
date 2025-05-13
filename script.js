    function displayQuizPage() {
    const name = document.getElementById("name").value;
    
    window.location.href = `quiz.html?name=${encodeURIComponent(name)}`;
    return false;
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const name = getQueryParam("name");
  document.getElementById("nameoutput").textContent = name || "No name found.";


  let time = 20; 
const timerElement = document.getElementById('timer');

const updateTimer = () => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  
  timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  if (time > 0) {
    time--;
    setTimeout(updateTimer, 1000);
  }
};

updateTimer();




const quizData = [
  {
    question: "1. What is the correct way to declare a variable in Java?",
    options: [
      "int num = 5;",
      "num int = 5;",
      "int = 5 num;",
      "5 = int num;"
    ],
    correct: 0
  },
  {
    question: "2. Which keyword is used to create a class in Java?",
    options: [
      "define",
      "function",
      "class",
      "className"
    ],
    correct: 2
  },
  {
    question: "3. What is the default value of a boolean variable in Java?",
    options: [
      "true",
      "false",
      "null",
      "0"
    ],
    correct: 1
  },
  {
    question: "4. Which method is the entry point of a Java program?",
    options: [
      "start()",
      "run()",
      "main()",
      "execute()"
    ],
    correct: 2
  },
  {
    question: "5. What will be the output of: System.out.println(3 + 4 + \"Java\")?",
    options: [
      "7Java",
      "34Java",
      "Java7",
      "Java34"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 20;

const questionEl = document.getElementById("question-text");
const formEl = document.getElementById("quiz-form");
const questionCountEl = document.getElementById("question-count");
const timerEl = document.getElementById("timer");
const nextBtn = document.querySelector(".btnnext");

function startTimer() {
  timeLeft = 20;
  timerEl.innerText = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion(); 
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timerInterval);
  startTimer();

  const quiz = quizData[currentQuestion];
  questionEl.innerText = quiz.question;
  questionCountEl.innerText = `Question ${currentQuestion + 1}/${quizData.length}`;

  const optionsHtml = quiz.options.map((opt, idx) => {
    return `
      <div class="form-check mb-2 text-start">
        <input class="form-check-input" type="radio" name="answer" id="option${idx}" value="${idx}" />
        <label class="form-check-label" for="option${idx}">
          ${opt}
        </label>
      </div>
    `;
  }).join("");

  formEl.innerHTML = optionsHtml;
}

function nextQuestion() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (selectedOption) {
    const selectedAnswer = parseInt(selectedOption.value);
    if (selectedAnswer === quizData[currentQuestion].correct) {
      score++;
    }
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    document.querySelector(".quiz-card").innerHTML = `
      <h3 class="text-success">You scored ${score} out of ${quizData.length}</h3>
    `;
    nextBtn.style.display = "none";
    timerEl.style.display = "none";
    questionCountEl.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  nextQuestion();
});


loadQuestion();
