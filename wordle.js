$(document).ready(function () {
    wordl = new Wordle();
    wordl.newGame();
});

function Wordle() {
    this.word = null;
    this.guess = null;

    this.newGame = function () {
        this.word = this.getWord();
        $("#correct_answer").html("");
        $("#newgame").hide();
        $("#guess").show();
        $("#enter").show();
    };

    this.getWord = async function () {
        let response = await fetch('dictionary.json');
        let data = await response.json();
        let randomIndex = Math.floor(Math.random() * data.length);
        this.word = data[randomIndex];
        console.log('The word is: "' + this.word + '"');
    };

    this.enterGuess = async function () {
        this.guess = $("#guess").val().toUpperCase();
        if (this.guess.length !== 5) {
            alert("Word must be 5 letters long!");
            return;
        }

        let validWord = await this.checkIfWord();
        if (!validWord) {
            alert("Invalid word!");
            return;
        }

        if (this.guess === this.word.toUpperCase()) {
            alert("Congratulations! You guessed the word: " + this.word);
            $("#newgame").show();
            $("#guess").hide();
            $("#enter").hide();
        }
    };

    this.checkIfWord = async function () {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.guess}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data.length > 0 && typeof data[0] !== "string";
        } catch (error) {
            console.error("Could not check word:", error);
            return false;
        }
    };
}

$("#enter").click(function () {
    wordl.enterGuess();
});

$("#newgame").click(function () {
    wordl.newGame();
});

$("#guess").keyup(function (event) {
    if (event.key === "Enter") {
        $("#enter").click();
    }
});
