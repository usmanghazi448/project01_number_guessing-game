"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var NumberGuessingGame = /** @class */ (function () {
    function NumberGuessingGame(maxNumber) {
        this.maxAttempts = 10;
        this.maxNumber = maxNumber;
        this.secretNumber = this.generateRandomNumber();
    }
    NumberGuessingGame.prototype.generateRandomNumber = function () {
        return Math.floor(Math.random() * (this.maxNumber + 1));
    };
    NumberGuessingGame.prototype.startGame = function () {
        var _this = this;
        console.log("Welcome to the Number Guessing Game!");
        console.log("You have ".concat(this.maxAttempts, " attempts to guess a number between 0 and ").concat(this.maxNumber, "."));
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        var playRound = function (attemptsLeft) {
            rl.question("Enter your guess: ", function (guessInput) {
                var guess = parseInt(guessInput, 10);
                if (isNaN(guess) || guess < 0 || guess > _this.maxNumber) {
                    console.log('Invalid input. Please enter a number between 0 and', _this.maxNumber);
                }
                else {
                    if (guess === _this.secretNumber) {
                        console.log('Congratulations! You guessed the correct number.');
                        rl.close();
                    }
                    else if (attemptsLeft === 1) {
                        console.log("Sorry, you've exhausted all your attempts. The correct number was ".concat(_this.secretNumber, "."));
                        rl.close();
                    }
                    else {
                        var hint = guess < _this.secretNumber ? 'higher' : 'lower';
                        console.log("Incorrect guess. Try again. Hint: The secret number is ".concat(hint, "."));
                        playRound(attemptsLeft - 1);
                    }
                }
            });
        };
        playRound(this.maxAttempts);
    };
    return NumberGuessingGame;
}());
var maxNumberToGuess = 100; // Change this to set the maximum number to guess
var game = new NumberGuessingGame(maxNumberToGuess);
game.startGame();
