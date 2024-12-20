const questions = [
  {
    question: "How do you feel about solving puzzles or logical problems?",
    options: [
      { answer: "I’m okay with it, but it can get frustrating", type: "maybe" },
      { answer: "I love it and find it fun", type: "correct" },
      { answer: "I dislike it and avoid it", type: "wrong" },
    ],
  },
  {
    question: "How do you respond to failure or mistakes?",
    options: [
      {
        answer: "I see it as an opportunity to learn and grow",
        type: "correct",
      },
      { answer: "I find it hard to move on and lose interest", type: "wrong" },
      { answer: "I get discouraged but eventually try again", type: "maybe" },
    ],
  },
  {
    question: "Do you enjoy working on tasks that require attention to detail?",
    options: [
      { answer: "Sometimes, but I can lose patience", type: "maybe" },
      {
        answer: "No, I prefer tasks that don’t require much detail",
        type: "wrong",
      },
      { answer: "Yes, I enjoy tasks that challenge my focus", type: "correct" },
    ],
  },
  {
    question:
      "How much time are you willing to dedicate to learning something new?",
    options: [
      {
        answer: "I can dedicate several hours a week consistently",
        type: "correct",
      },
      {
        answer: "I can dedicate some time, but not consistently",
        type: "maybe",
      },
      { answer: "I don’t have much time to spare", type: "wrong" },
    ],
  },
  {
    question: "Do you like experimenting with new technologies or apps?",
    options: [
      { answer: "Yes, I’m always curious to try new things", type: "correct" },
      { answer: "No, I stick to what I already know", type: "wrong" },
      {
        answer: "Sometimes, but only if it’s easy to understand",
        type: "maybe",
      },
    ],
  },
  {
    question:
      "Are you comfortable asking for help when you don’t understand something?",
    options: [
      { answer: "Sometimes, but I feel shy about it", type: "maybe" },
      { answer: "Yes, I actively seek help and feedback", type: "correct" },
      { answer: "No, I prefer figuring things out on my own", type: "wrong" },
    ],
  },
  {
    question:
      "Do you enjoy learning new concepts or skills by reading or watching tutorials?",
    options: [
      {
        answer: "Yes, I enjoy exploring and learning through tutorials",
        type: "correct",
      },
      {
        answer: "I can manage, but I prefer being taught in person",
        type: "maybe",
      },
      {
        answer: "No, I find it hard to stay engaged with tutorials",
        type: "wrong",
      },
    ],
  },
  // Add more questions as needed
];

//getting elements from the DOM
const quiz_container = document.querySelector("#quiz-container");
const question_container = document.querySelector("#question-container");
const form = document.querySelector("form");
const firstName = document.querySelector("#firstName");
const email = document.querySelector("input[type='email']");
const controls = document.querySelector("#controls");

let user = {};

let questionIndex = 0;
let selectedAnswers = [];

const score = {
  correct: 2,
  maybe: 1,
  wrong: 0,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = firstName.value.trim();
  const mail = email.value.trim();
  if (!name || !mail) {
    return alert("Please fill in the form");
  }
  user.name = name;
  user.mail = mail;

  loadQuestion(questionIndex);
});

//adding the questions
function loadQuestion(index) {
  const question = questions[index];
  question_container.innerHTML = "";
  question_container.innerHTML = `
  <h2 class= "q-h2">${question.question}</h2>
  <ul class = "options">${question.options
    .map(
      (option, i) => ` 
    <li data-type= "${option.type}">
    <div class = "check"  
    id = "${selectedAnswers[index] == i ? "checked" : ""}">
    </div>${option.answer}</li>
  `
    )
    .join("")}
    </ul>
  `;
  const checks = document.querySelectorAll(".check");
  checks.forEach((check, i) => {
    check.addEventListener("click", () => {
      selectedAns(check, index, i);
    });
  });

  controls.innerHTML = "";

  const previousBtn = document.createElement("button");
  const previous_button = "previous_button";
  previousBtn.id = previous_button;
  previousBtn.classList.add("btn");
  previousBtn.textContent = "Previous";

  const nextBtn = document.createElement("button");
  const next_button = "next_button";
  nextBtn.id = next_button;
  nextBtn.classList.add("btn");

  controls.appendChild(previousBtn);
  controls.appendChild(nextBtn);

  previousBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "submit" : "Next";

  //buttons functionality
  buttons(previousBtn, nextBtn);
}

//saving selected answers
function selectedAns(element, questionIndex, answerPicked) {
  //saving the answer
  selectedAnswers[questionIndex] = answerPicked;

  //updating UI for selected answers

  const selected = document.querySelectorAll("li div");
  selected.forEach((opt) => {
    opt.classList.remove("checked");
  });

  element.classList.add("checked");
}

function buttons(btn1, btn2) {
  btn1.addEventListener("click", () => {
    if (questionIndex <= 0) return;
    questionIndex--;
    loadQuestion(questionIndex);
  });

  btn2.addEventListener("click", () => {
    //if the user selected an option
    const user_option = selectedAnswers[questionIndex];
    if (user_option === undefined) {
      return alert("Please choose an option");
    }
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      return loadQuestion(questionIndex);
    } else {
      feedback();
    }
  });
}

function totalScore() {
  return selectedAnswers.reduce((total, curr, index) => {
    let answer = questions[index].options[curr].type;
    return total + score[answer];
  }, 0);
}

function feedback() {
  let total = totalScore();
  question_container.innerHTML = "";
  question_container.style.height = "10%";
  controls.innerHTML = "";
  const result = document.querySelector("#result");

  if (total > 10) {
    result.innerHTML = `Hey ${user.name} you are on the right track to becoming a strong programmer you are good to go <br/> Score:${total}`;
  } else if (total >= 5) {
    result.innerHTML = `Hey ${user.name} you have a good programming intuition 
    just keep on practicing <br/> Score:${total}`;
  } else {
    result.innerHTML = `Hey ${user.name} you need to change your mentality on programming but i believe with the right practice and study guide you will be good to go <br/> Score:${total}`;
  }
}
