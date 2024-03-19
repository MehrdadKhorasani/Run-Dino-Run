const dino = document.querySelector("[data-dino]");
const startMSG = document.querySelector(".start-dialog");
const scoreContainer = document.querySelector(".score");

let playing = false;
let score = 0;

function init() {
  playing = false;
  score = 0;
  startMSG.classList.remove("hidden");
  scoreContainer.textContent = 0;
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
});
