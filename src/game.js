import "./style.scss";
import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

class Game {
  game = document.querySelector(".game");
  newGame = document.querySelector(".new-game");
  fields = document.querySelectorAll(".field");
  sound = document.querySelector(".sound-input");
  modalResult = document.querySelector(".modal-result");
  containerWinner = document.querySelector(".container-winner");
  count = 0;
  step = false;
  isFinished = false;

  zero = `<svg class="circle o">
  <circle
  class="circle o
    r="45"
    cx="58"
    cy="58"
    stroke="blue"
    stroke-width="10"
    fill="none"
    stroke-linecap="round"
  />
  </svg>`;
  cross = `<svg class="cross ooo">
  <line
    class="first xxx"
    x1="15"
    y1="15"
    x2="100"
    y2="100"
    stroke="red"
    stroke-width="10"
    stroke-linecap="round"
  />
  <line
    class="second x"
    x1="100"
    y1="15"
    x2="15"
    y2="100"
    stroke="red"
    stroke-width="10"
    stroke-linecap="round"
  />
  </svg>`;

  constructor() {
    this.playTwoplayers = (e) => {
      if (
        e.target.tagName != "svg" &&
        e.target.tagName != "line" &&
        e.target.tagName != "circle"
      ) {
        if (
          !this.step &&
          this.isFinished == false &&
          !e.target.classList.contains("x") &&
          !e.target.classList.contains("o")
        ) {
          this.game.removeEventListener("click", this.playTwoplayers);
          this.drawCross(e.target);
          this.step = !this.step;
          this.game.addEventListener("animationend", () => {
            this.game.addEventListener("click", this.playTwoplayers);
          });
        } else if (
          this.step &&
          this.isFinished == false &&
          !e.target.classList.contains("x") &&
          !e.target.classList.contains("o")
        ) {
          this.game.removeEventListener("click", this.playTwoplayers);
          this.drawZero(e.target);
          this.step = !this.step;
        }
      } else {
        this.game.removeEventListener("click", this.playTwoplayers);
        this.game.addEventListener("click", this.playTwoplayers);
      }
    };
    this.playX = (e) => {
      if (
        e.target.tagName != "svg" &&
        e.target.tagName != "line" &&
        e.target.tagName != "circle"
      ) {
        if (!this.step && this.isFinished == false) {
          this.game.removeEventListener("click", this.playX);

          this.drawCross(e.target);
          setTimeout(() => {
            this.game.addEventListener("click", this.playX);
          }, 2500);
          // this.e.target.addEventListener("animationend", () => {
          //   this.game.addEventListener("click", this.playX);
          // });
        }
        // } else if (this.step && this.isFinished == false) {
        //   this.game.removeEventListener("click", this.playTwoplayers);
        //   this.game.removeEventListener("click", this.playX);
        //   this.drawZero(e.target);
        //   this.game.addEventListener("animationend", () => {
        //     this.game.addEventListener("click", this.playX);
        //   });
        // }

        this.step = true;
        this.playWithComputer();
      }
    };

    this.playOFirstStep = (e) => {
      const random = Math.floor(Math.random() * 8);
      if (!this.step && this.isFinished == false) {
        this.game.removeEventListener("click", this.playX);
        this.drawCross(this.fields[random]);
      }
    };

    this.step0 = (e) => {
      if (!this.step && this.isFinished == false) {
        this.drawZero(e.target);
        this.step = false;
        this.playOCompStep(e);
      }
    };

    this.playOCompStep = (e) => {
      let freeFields = [];
      let randomNumber;

      setTimeout(() => {
        this.fields.forEach((field, ind) => {
          if (
            !field.classList.contains("x") &&
            !field.classList.contains("o")
          ) {
            freeFields.push(field);
          }
        });

        if (freeFields.length >= 1 && this.isFinished == false) {
          this.identifyWinner();
          randomNumber = this.getRandomInt(freeFields.length - 1);
          if (!this.step && this.isFinished == false) {
            this.game.removeEventListener("click", this.step0);
            setTimeout(() => {
              this.game.addEventListener("click", this.step0);
            }, 1500);

            this.drawCross(freeFields[randomNumber]);
          }
        }
      }, 1500);
    };
  }

  readyGameTwoPlayers() {
    this.game.addEventListener("click", this.playTwoplayers);
  }
  readyGameX() {
    this.game.addEventListener("click", this.playX);
  }
  readyGameO() {
    this.playOFirstStep();
    this.game.addEventListener("click", this.step0);
  }
  drawCross(target) {
    if (
      target.classList.contains("x") ||
      target.classList.contains("o") ||
      target.className == "SVG"
    ) {
    } else {
      target.innerHTML = this.cross;
      target.classList.add("x");
      if (this.sound.checked == true) {
        let crossAudio = new Audio("./assets/audio/cross.mp3");
        crossAudio.play();
      }

      this.count++;
      this.identifyWinner();
    }
  }
  drawZero(target) {
    target.innerHTML = this.zero;
    target.classList.add("o");
    if (this.sound.checked == true) {
      let zeroAudio = new Audio("./assets/audio/zero.mp3");
      zeroAudio.play();
    }

    this.count++;
    this.identifyWinner();
  }

  playWithComputer() {
    let freeFields = [];
    let randomNumber;
    setTimeout(() => {
      this.fields.forEach((field, ind) => {
        if (!field.classList.contains("x") && !field.classList.contains("o")) {
          freeFields.push(field);
        }
      });
      if (freeFields.length >= 1 && this.isFinished == false) {
        this.identifyWinner();
        randomNumber = this.getRandomInt(freeFields.length - 1);
        if (!this.step && this.isFinished == false) {
          this.drawCross(freeFields[randomNumber]);
        } else if (this.step && this.isFinished == false);
        this.drawZero(freeFields[randomNumber]);
        this.step = !this.step;
      }
    }, 1500);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  gameClear() {
    this.isFinished = false;
    this.step = false;
    this.count = 0;
    this.game.removeEventListener("click", this.playTwoplayers);
    this.game.removeEventListener("click", this.playX);
    this.game.removeEventListener("click", this.step0);
    this.containerWinner.innerHTML = "";
    this.fields.forEach((field) => {
      field.innerHTML = "";
      field.classList.remove("x", "o", "active");
    });
  }

  identifyWinner() {
    let combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinations.length; i++) {
      if (
        this.fields[combinations[i][0]].classList.contains("x") &&
        this.fields[combinations[i][1]].classList.contains("x") &&
        this.fields[combinations[i][2]].classList.contains("x")
      ) {
        this.isFinished = true;
        setTimeout(() => {
          this.fields[combinations[i][0]].classList.add("active");
          this.fields[combinations[i][1]].classList.add("active");
          this.fields[combinations[i][2]].classList.add("active");
        }, 1000);

        this.game.removeEventListener("click", this.playTwoplayers);
        this.game.removeEventListener("click", this.playX);
        this.game.addEventListener("click", this.step0);
        this.containerWinner.innerHTML = `
        <h2 class="animate__animated animate__bounceInDown">Ooops...Win X, ${this.count} steps </h2>
                <img class='animate__animated animate__jackInTheBox' src="./assets/svg/smile.svg" alt="">
        `;
        if (this.sound.checked == true) {
          let finishAudio = new Audio("./assets/audio/finish.mp3");
          finishAudio.play();
        }
      } else if (
        this.fields[combinations[i][0]].classList.contains("o") &&
        this.fields[combinations[i][1]].classList.contains("o") &&
        this.fields[combinations[i][2]].classList.contains("o")
      ) {
        this.isFinished = true;
        setTimeout(() => {
          this.fields[combinations[i][0]].classList.add("active");
          this.fields[combinations[i][1]].classList.add("active");
          this.fields[combinations[i][2]].classList.add("active");
        }, 1000);

        this.game.removeEventListener("click", this.playTwoplayers);
        this.game.removeEventListener("click", this.playX);
        this.game.removeEventListener("click", this.step0);

        this.containerWinner.innerHTML = `
        <h2 class="animate__animated animate__bounceInDown">Ooops...Win O, ${this.count} steps</h2>
                <img class='animate__animated animate__jackInTheBox' src="./assets/svg/smile.svg" alt="">
        `;
        if (this.sound.checked == true) {
          let finishAudio = new Audio("./assets/audio/finish.mp3");
          finishAudio.play();
        }
      } else if (this.count == 9) {
        setTimeout(() => {
          if (this.isFinished == false) {
            this.isFinished = true;

            this.game.removeEventListener("click", this.playTwoplayers);
            this.game.removeEventListener("click", this.playX);
            this.game.removeEventListener("click", this.step0);

            this.containerWinner.innerHTML = `
            <h2 class="animate__animated animate__bounceInDown">Ooops...Draw</h2>
                    <img class='animate__animated animate__jackInTheBox' src="./assets/svg/smile.svg" alt="">
            `;
            if (this.sound.checked == true) {
              let finishAudio = new Audio("./assets/audio/finish.mp3");
              finishAudio.play();
              console.log("draw");
            }
          }
        }, 1000);
      }
    }
  }

  adaptiveMobile() {
    if (window.innerWidth <= 480) {
      this.zero = `<svg class="circle">
          <circle
            r="35"
            cx="48"
            cy="48"
            stroke="blue"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
          />
        </svg>`;
      this.cross = `<svg class="cross">
        <line
          class="first"
          x1="15"
          y1="15"
          x2="82"
          y2="82"
          stroke="red"
          stroke-width="10"
          stroke-linecap="round"
        />
        <line
          class="second"
          x1="82"
          y1="15"
          x2="15"
          y2="82"
          stroke="red"
          stroke-width="10"
          stroke-linecap="round"
        />
      </svg>`;
    } else {
      this.zero = `<svg class="circle">
      <circle
        r="45"
        cx="58"
        cy="58"
        stroke="blue"
        stroke-width="10"
        fill="none"
        stroke-linecap="round"
      />
      </svg>`;
      this.cross = `<svg class="cross">
      <line
        class="first"
        x1="15"
        y1="15"
        x2="100"
        y2="100"
        stroke="red"
        stroke-width="10"
        stroke-linecap="round"
      />
      <line
        class="second"
        x1="100"
        y1="15"
        x2="15"
        y2="100"
        stroke="red"
        stroke-width="10"
        stroke-linecap="round"
      />
      </svg>`;
    }
  }
}

export default Game;
