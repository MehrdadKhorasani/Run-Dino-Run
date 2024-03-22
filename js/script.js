const game = document.querySelector(".game");
const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-dialog");
const scoreElement = document.querySelector(".score");
const ground = document.querySelector(".ground");

let playing, score;

function init() {
  playing = false;
  score = 0;
  scoreElement.textContent = score;
  startMSG.classList.remove("hidden");
  ground.classList.remove("groundAnimation");
  dino.src = "../img/dino-stationary.png";
}

function startGame() {
  playing = true;
  startMSG.classList.add("hidden");
  ground.classList.add("groundAnimation");
  dino.src = "../img/dino-run.png";
  const scoreInterval = setInterval(() => {
    score++;
    scoreElement.textContent = score;
  }, 50);

  function endGame() {
    clearInterval(scoreInterval);
    init();
  }

  function dinoJump() {
    if (!dino.classList.contains("jump-animation")) {
      dino.classList.add("jump-animation");

      setTimeout(function () {
        dino.classList.remove("jump-animation");
      }, 1000);
    }
  }

  const cactusMaker = setInterval(() => {
    const cactus = document.createElement("div");
    cactus.classList.add("cactus");
    game.appendChild(cactus);
    setTimeout(() => game.removeChild(cactus), 1500);
    loseCheck(cactus);
  }, 1500);

  function loseCheck(cactus) {
    let dinoBottom = parseInt(
      window.getComputedStyle(dino).getPropertyValue("bottom")
    );
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );
    console.log(cactusLeft, dinoBottom);
    if (cactusLeft < 50 && cactusLeft > 0 && dinoBottom >= 122) {
      console.log("lose");
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && playing) {
      dinoJump();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      endGame();
    }
  });
}

init();

document.addEventListener("keydown", () => {
  if (!playing) startGame();
});
