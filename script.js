const ruleBtn = document.getElementById("rule-btn");

const ruleBox = document.querySelector(".rule-container");

const cancelBtn = document.getElementById("cancel");

const handleRuleBtn = () => {
  ruleBox.style.display = "flex";
};

ruleBtn.addEventListener("click", () => {
  console.log("ruleClick")
  handleRuleBtn();
});
const handleCancelBtn = () => {
  ruleBox.style.display = "none";
};

cancelBtn.addEventListener("click", handleCancelBtn);


const userChoiceDisplay = document.querySelector(".btn-left");
const computerChoiceDisplay = document.querySelector(".btn-right");
const resultDisplay = document.querySelector("#result");
const possibleChoices = document.querySelectorAll(".userBtn");
const gameBox = document.querySelector(".game-container");
const winBox = document.querySelector(".win-container");
const nextBtn = document.getElementById("next-btn");

const u_score = JSON.parse(localStorage.getItem("userScore"));
const c_score = JSON.parse(localStorage.getItem("computerScore"));
const userScoreNum = document.getElementById("userScore");
const computerScoreNum = document.getElementById("computerScore");
const pcLine = document.getElementById("againstPc")
const playAgainBtn = document.getElementById("btn-change")

if (u_score) {
  userScoreNum.innerText = u_score;
}
if (c_score) {
  computerScoreNum.innerText = c_score;
}
let userCount = 0;
let computerCount = 0;

let userChoice;
let computerChoice;
let result;
let resultShown = false;


const makeBtnStatic = () => {
  possibleChoices.forEach((button) => {
    button.disabled = true;
  });
};

possibleChoices.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (resultShown) {
      return;
    }
    userChoice = e.currentTarget;
    console.log(userChoice);

    gameBox.style.display = "none";
    winBox.style.display = "flex";

    userChoiceDisplay.innerHTML = "";

    userChoiceDisplay.appendChild(userChoice);

    generateComputerChoice();

    getResult();

    makeBtnStatic();
  });
});

const generateComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length);

  computerChoice = possibleChoices[randomNumber];
  computerChoiceDisplay.innerHTML = "";
  computerChoiceDisplay.appendChild(computerChoice);
  console.log(computerChoice);
};

const removeWinnerStyle = () => {
  possibleChoices.forEach((button) => {
    button.classList.remove("winner-style");
  });
};

const getResult = () => {
  const userId = userChoice.id;
  console.log(userId);
  const computerId = computerChoice.id;
  console.log(computerId);

  if (userId === computerId) {
    resultDisplay.innerHTML = "TIE UP";

    userChoiceDisplay.appendChild(userChoice.cloneNode(true));

    pcLine.style.display = "none"
    playAgainBtn.innerText = "REPLAY"

  } else if (
    (userId === "rock-bg" && computerId === "scissor-bg") ||
    (userId === "paper-bg" && computerId === "rock-bg") ||
    (userId === "scissor-bg" && computerId === "paper-bg")
  ) {
    resultDisplay.innerHTML = "YOU WIN";
    userChoice.classList.add("winner-style");
    nextBtn.style.display = "inline-block";
    userCount = u_score;
    userCount++;
    userScoreNum.innerText = userCount;
    localStorage.setItem("userScore", JSON.stringify(userCount));
  } else {
    resultDisplay.innerHTML = "YOU LOST";
    computerChoice.classList.add("winner-style");
    ruleBox.style.right = 0
    computerCount = c_score;
    computerCount++;
    computerScoreNum.innerText = computerCount;
    localStorage.setItem("computerScore", JSON.stringify(computerCount));
  }

};
