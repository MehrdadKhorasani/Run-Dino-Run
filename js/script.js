"use strict";

const game = document.querySelector(".game");
const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-message");
const scoreElement = document.querySelector(".score");
const ground = document.querySelector(".ground");

let playing, score;
let cactusInterval, collisionInterval;
const cactuses = [];

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
    clearInterval(cactusInterval);
    clearInterval(collisionInterval);
    cactuses.forEach((cactus) => game.removeChild(cactus));
    cactuses.length = 0;
    document.removeEventListener("keydown", handleKeyPress);
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
    cactuses.push(cactus);
    setTimeout(() => {
      game.removeChild(cactus);
      const index = cactuses.indexOf(cactus);
      if (index !== -1) cactuses.splice(index, 1);
    }, 1500);
  }

  function randomCactus() {
    if (playing) {
      createCactus();
      const delay = Math.random() * (5 - 0.5) + 0.5;
      setTimeout(randomCactus, delay * 1000);
    }
  }

  function checkLose() {
    const dinoRect = dino.getBoundingClientRect();
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

  function handleKeyPress(e) {
    if (e.code === "Space" && playing) {
      dinoJump();
    } else if (e.code === "Escape" && playing) {
      endGame();
    }
  }

  document.addEventListener("keydown", handleKeyPress);
  cactusInterval = setTimeout(randomCactus, 1000);
  collisionInterval = setInterval(checkLose, 100);
}

init();

document.addEventListener("keydown", () => {
  if (!playing) {
    startGame();
  }
});
