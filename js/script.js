const game = document.querySelector(".game");
const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-dialog");
const scoreElement = document.querySelector(".score");
const ground = document.querySelector(".ground");

let playing, score;

// initial situation
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
    clearInterval(cactusFunction);
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

  function createCactus() {
    const cactus = document.createElement("div");
    cactus.classList.add("cactus");
    game.appendChild(cactus);
    setTimeout(() => game.removeChild(cactus), 1500);
  }

  function randomCactus(minTime, maxTime) {
    const delay = Math.random() * (maxTime - minTime) + minTime;

    setTimeout(createCactus, delay * 1000);
  }

  function checkLose() {
    const dinoRect = dino.getBoundingClientRect();
    const cactuses = document.querySelectorAll(".cactus");
    cactuses.forEach((cactus) => {
      const cactusRect = cactus.getBoundingClientRect();
      if (
        dinoRect.top < cactusRect.bottom &&
        dinoRect.bottom > cactusRect.top &&
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right
      ) {
        endGame();
      }
    });
  }

  // game handlers
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

  cactusFunction = setInterval(() => randomCactus(0, 6), 1500);
  collisionFunction = setInterval(() => checkLose(), 100);
}

init();

document.addEventListener("keydown", () => {
  if (!playing) startGame();
});
