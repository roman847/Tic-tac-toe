import "./style.scss";
import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Game from "./game";
import "animate.css";

const game = document.querySelector(".game");
const newGame = document.querySelector(".new-game");
// const startGame = document.querySelector(".start-game");
const changeXorY = document.querySelector(".change-x__or__y");
const player = document.querySelector(".players");
const btnStart = document.querySelector(".start");
const btnClear = document.querySelector(".clear");
const fields = document.querySelectorAll(".field");

const MyGame = new Game();

btnClear.addEventListener("click", MyGame.gameClear.bind(MyGame));
// startGame.addEventListener("click", MyGame.gameClear.bind(MyGame));
btnStart.addEventListener("click", () => {
  MyGame.gameClear.bind(MyGame);
  if (player.value == "1") {
    if (changeXorY.value == "2") {
      game.addEventListener("click", MyGame.readyGameO());
    } else {
      game.addEventListener("click", MyGame.readyGameX());
    }
  } else if (player.value == "2") {
    game.addEventListener("click", MyGame.readyGameTwoPlayers());
  }
});

window.addEventListener("load", MyGame.adaptiveMobile.bind(MyGame));
window.addEventListener("resize", MyGame.adaptiveMobile());

player.addEventListener("change", () => {
  MyGame.gameClear();
  if (player.value == "1") {
    changeXorY.disabled = "";
  } else {
    changeXorY.disabled = "disabled";
  }
});
changeXorY.addEventListener("change", MyGame.gameClear.bind(MyGame));
