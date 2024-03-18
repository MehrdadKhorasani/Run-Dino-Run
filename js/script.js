const dino = document.querySelector("[data-dino]");

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !dino.classList.contains("jump-animation")) {
    dino.classList.add("jump-animation");

    setTimeout(() => {
      dino.classList.remove("jump-animation");
    }, 1000);
  }
});
