const wordList = [
    "apple", "grape", "table", "chair", "brick", "flame", "storm", "plant", "crown", "swift",
    "ocean", "train", "globe", "sharp", "wrist", "spine", "pride", "flock", "sword", "brush",
    "melon", "latch", "creek", "frost", "smile", "dance", "blaze", "fuzzy", "jolly", "quilt"
  ];
  
  let answer = wordList[Math.floor(Math.random() * wordList.length)];
  let attempts = 0;
  const maxAttempts = 6;
  let usedLetters = {};
  
  document.addEventListener("DOMContentLoaded", () => {
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const board = document.getElementById("board");
    const keyboard = document.getElementById("keyboard");
    const restartButton = document.getElementById("restart");
    
    guessButton.addEventListener("click", () => {
      let guess = guessInput.value.toLowerCase();
      if (guess.length !== 5 || !wordList.includes(guess)) {
        alert("Please enter a valid 5-letter word.");
        return;
      }
  
      processGuess(guess);
      guessInput.value = "";
    });
  
    restartButton.addEventListener("click", () => {
      location.reload();
    });
  
    function processGuess(guess) {
      if (attempts >= maxAttempts) return;
  
      const row = document.createElement("div");
      row.classList.add("word-row");
      
      let answerMap = {};
      [...answer].forEach(letter => answerMap[letter] = (answerMap[letter] || 0) + 1);
  
      [...guess].forEach((char, i) => {
        const cell = document.createElement("div");
        cell.classList.add("letter-box");
        cell.textContent = char;
        
        if (answer[i] === char) {
          cell.classList.add("correct");
          answerMap[char]--;
        } else if (answer.includes(char) && answerMap[char] > 0) {
          cell.classList.add("misplaced");
          answerMap[char]--;
        } else {
          cell.classList.add("incorrect");
        }
        row.appendChild(cell);
        usedLetters[char] = cell.className.split(" ")[1];
      });
  
      board.appendChild(row);
      updateKeyboard();
      attempts++;
  
      if (guess === answer) {
        alert("Congratulations! You guessed the word!");
        restartButton.style.display = "block";
      } else if (attempts === maxAttempts) {
        alert(`Game over! The word was ${answer}`);
        restartButton.style.display = "block";
      }
    }
  
    function updateKeyboard() {
      keyboard.innerHTML = "";
      "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
        const key = document.createElement("div");
        key.classList.add("key");
        key.textContent = letter;
        if (usedLetters[letter]) key.classList.add(usedLetters[letter]);
        keyboard.appendChild(key);
      });
    }
  });
  