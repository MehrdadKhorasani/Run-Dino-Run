const game = document.querySelector(".game");
const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-dialog");
const scoreElement = document.querySelector(".score");
const ground = document.querySelector(".ground");

let playing = false;
let score = 0;

init();

function init() {
  playing = false;
  score = 0;
  startMSG.classList.remove("hidden");
  scoreElement.textContent = score;
  ground.classList.remove("groundAnimation");
  dino.src = "../img/dino-stationary.png";

  document.addEventListener("keydown", gameStart);
}

function gameStart() {
  playing = true;
  startMSG.classList.add("hidden");
  ground.classList.add("groundAnimation");
  dino.src = "../img/dino-run.png";
  setInterval(() => {
    if (playing === true) {
      score++;
    }
    scoreElement.textContent = score;
  }, 50);
}

document.addEventListener("keydown", function (e) {
  if (
    playing &&
    e.code === "Space" &&
    !dino.classList.contains("jump-animation")
  ) {
    dino.classList.add("jump-animation");

    setTimeout(() => {
      dino.classList.remove("jump-animation");
    }, 1000);
  }
  if (playing && e.code === "Escape") init();
});

function createCactus() {
  if (playing) {
    const cactus = document.createElement("div");
    cactus.classList.add("cactus");
    game.appendChild(cactus);

    setTimeout(() => {
      game.removeChild(cactus);
    }, 2000);
  }
}

function randomCactus(minTime, maxTime) {
  if (playing) {
    const delay = Math.random() * (maxTime - minTime) + minTime;
    // console.log(Number(delay));
    setTimeout(createCactus, delay * 1000);
  }
}

setInterval(() => randomCactus(0, 2), 1500);
