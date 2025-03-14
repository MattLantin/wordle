// Initialize the Wordle game when the document is ready
$(document).ready(function () {
    wordl = new Wordle();
    wordl.newGame();
});

// Wordle game class
function Wordle() {
    this.word = null; // The target word
    this.guess = null; // The player's current guess

    // Starts a new game
    this.newGame = function () {
        this.word = this.getWord(); // Fetch a random word
        $("#correct_answer").html(""); // Clear previous answer
        $("#newgame").hide(); // Hide new game button
        $("#guess").show(); // Show input box
        $("#enter").show(); // Show enter button
    };

    // Fetch a random word from dictionary.json
    this.getWord = async function () {
        let response = await fetch('dictionary.json'); // Fetch the dictionary file
        let data = await response.json(); // Parse JSON
        let randomIndex = Math.floor(Math.random() * data.length); // Get random index
        this.word = data[randomIndex]; // Select word
        console.log('The word is: "' + this.word + '"'); // Debugging: log the word
    };

    // Handles a player's guess
    this.enterGuess = async function () {
        this.guess = $("#guess").val().toUpperCase(); // Get user's guess and convert to uppercase

        // Ensure the guess is exactly 5 letters long
        if (this.guess.length !== 5) {
            alert("Word must be 5 letters long!");
            return;
        }

        // Validate word existence using API
        let validWord = await this.checkIfWord();
        if (!validWord) {
            alert("Invalid word!");
            return;
        }

        // Check if the guessed word matches the target word
        if (this.guess === this.word.toUpperCase()) {
            alert("Congratulations! You guessed the word: " + this.word);
            $("#newgame").show(); // Show new game button
            $("#guess").hide(); // Hide input box
            $("#enter").hide(); // Hide enter button
        }
    };

    // Check if the guessed word exists in a dictionary API
    this.checkIfWord = async function () {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.guess}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data.length > 0 && typeof data[0] !== "string"; // Return true if word exists
        } catch (error) {
            console.error("Could not check word:", error);
            return false;
        }
    };
}

// Event listeners
$("#enter").click(() => wordl.enterGuess());
$("#newgame").click(() => wordl.newGame());
$("#guess").keyup((event) => {
    if (event.key === "Enter") $("#enter").click();
});
