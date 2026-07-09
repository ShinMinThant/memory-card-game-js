const emojis = ["🐱", "🐶", "🍎", "🚗"];

const gameBoard = document.querySelector(".game-board");
const movesText = document.getElementById("moves");
const restartButton = document.getElementById("restartBtn");
const message = document.getElementById("message");
const time = document.getElementById("timer");
const infoMessage = document.getElementById("info");

let flippedCards = [];
let moves = 0;
let matchedCards = 0;
let seconds = 0;
let timer;
let gameStarted = false;

function updateTime() {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  time.textContent = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    seconds++;
    updateTime();
  }, 1000);
}

function startGame() {
  const cards = emojis.concat(emojis);
  // shuffle cards
  cards.sort(() => Math.random() - 0.5);

  cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "?";
    card.dataset.value = emoji;

    card.addEventListener("click", function () {
      if (!gameStarted) {
        startTimer();
        gameStarted = true;
      }
      if (card.classList.contains("matched")) {
        return;
      }
      if (flippedCards.length === 2) {
        return;
      }

      card.textContent = card.dataset.value;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        moves++;
        movesText.textContent = moves;
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
          matchedCards += 2;
          flippedCards[0].classList.add("matched");
          flippedCards[1].classList.add("matched");
          flippedCards = [];

          if (matchedCards === 8) {
            clearInterval(timer);
            infoMessage.style.display = "none";
            message.innerHTML = `
            <div class="win-box">
                🎉 You Win! 🎉
                <p>Moves: ${moves}</p>
                <p>Time: ${time.textContent}</p>
            </div>
        `;
          }
        } else {
          setTimeout(() => {
            flippedCards[0].textContent = "?";
            flippedCards[1].textContent = "?";
            flippedCards = [];
          }, 1000);
        }
      }
    });
    gameBoard.appendChild(card);
  });
}

restartButton.addEventListener("click", function () {
  infoMessage.style.display = "block";
  clearInterval(timer);
  gameBoard.innerHTML = "";
  flippedCards = [];
  moves = 0;
  matchedCards = 0;
  seconds = 0;
  gameStarted = false;
  movesText.textContent = moves;
  updateTime();
  message.textContent = "";
  startGame();
});

startGame();
