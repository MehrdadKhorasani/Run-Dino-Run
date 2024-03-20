const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-dialog");
const scoreElement = document.querySelector(".score");
const ground = document.querySelector(".ground");

let playing = false;
let score = 0;

function init() {
  playing = false;
  score = 0;
  startMSG.classList.remove("hidden");
  scoreElement.textContent = score;
  ground.classList.remove("groundAnimation");
  dino.src = "../img/dino-stationary.png";
}
init();
if (!playing) document.addEventListener("keydown", gameStart);

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
