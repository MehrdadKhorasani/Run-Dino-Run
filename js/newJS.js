const elements = {
  scoreElement: document.querySelector(".score"),
  message: document.querySelector(".start-message"),
  ground: document.querySelector(".ground"),
  dino: document.querySelector(".dino"),
};

let score = 0;
let playing = false;
let scoreInterval;

function init() {
  playing = false;
  score = 0;
  elements.scoreElement.textContent = score;
  elements.message.classList.remove("hidden");
  elements.dino.src = "../img/dino-stationary.png";
  elements.ground.classList.remove("groundAnimation");

  clearInterval(scoreInterval);
}

document.addEventListener("keydown", function (e) {
  if (!playing && e.code !== "Escape") {
    startGame();
  }

  if (e.code === "Escape") {
    init();
  }
});

function startGame() {
  playing = true;
  scoreInterval = setInterval(() => {
    score++;
    elements.scoreElement.textContent = score;
  }, 1000);
  elements.message.classList.add("hidden");
  elements.dino.src = "../img/dino-run.png";
  elements.ground.classList.add("groundAnimation");
}
