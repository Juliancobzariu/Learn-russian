let score = parseInt(localStorage.getItem("score")) || 0;

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("score");
  if (scoreDisplay) {
    scoreDisplay.textContent = score;
  }
}

function increaseScore(amount = 1) {
  score += amount;
  localStorage.setItem("score", score);
  updateScoreDisplay();
}

function resetScore() {
  score = 0;
  localStorage.setItem("score", score);
  updateScoreDisplay();
}

updateScoreDisplay();
