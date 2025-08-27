const card = document.getElementById("card");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const correctBtn = document.getElementById("correct-btn");
const deleteBtn = document.getElementById("delete-btn");
const resetBtn = document.getElementById("reset-btn");
const flipBtn = document.getElementById("flip-btn");

let current = 0;
let showingFront = true;
let words = JSON.parse(localStorage.getItem("flashcards"));

if (!words || words.length === 0) {
  fetch("words.json")
    .then(res => res.json())
    .then(data => {
      words = data;
      localStorage.setItem("flashcards", JSON.stringify(words)); // Save initial data
      showCard();
    });
} else {
  showCard(); // ← Load from localStorage
}


const addForm = document.getElementById("add-form");
const ruInput = document.getElementById("ru-input");
const enInput = document.getElementById("en-input");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newWord = {
    ru: ruInput.value.trim(),
    en: enInput.value.trim()
  };

  if (newWord.ru && newWord.en) {
    words.push(newWord);
    localStorage.setItem("flashcards", JSON.stringify(words));

    current = words.length - 1;
    showingFront = true;
    showCard();

    ruInput.value = "";
    enInput.value = "";
  }
});

/*function showCard() {
  if (words.length === 0) return;
  const word = showingFront ? words[current].en : words[current].ru;
  card.textContent = word;
}*/

function showCard() {
  if (words.length === 0) return;

  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");

  front.textContent = words[current].en;
  back.textContent = words[current].ru;

  // Always reset to front when changing cards
  card.classList.remove("flipped");
}


nextBtn.addEventListener("click", () => {
  current = (current + 1) % words.length;
  showingFront = true;
  showCard();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + words.length) % words.length;
  showingFront = true;
  showCard();
});

card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});


correctBtn.addEventListener("click", () => {
  increaseScore();
});

resetBtn.addEventListener("click", () => {
  resetScore();
});

deleteBtn.addEventListener("click", () => {
  if (words.length === 0) return;

  const confirmed = confirm("Are you sure you want to delete this flashcard?");

 if (!confirmed) return;

  words.splice(current, 1);

  // Save updated list to localStorage
  localStorage.setItem("flashcards", JSON.stringify(words));

  // Adjust current index
  if (current >= words.length) {
    current = words.length - 1;
  }

  // Show next available card or clear display
  showCard();
});
