import * as readline from 'readline';

class NumberGuessingGame {
  private readonly maxAttempts: number = 10;
  private readonly maxNumber: number;
  private secretNumber: number;

  constructor(maxNumber: number) {
    this.maxNumber = maxNumber;
    this.secretNumber = this.generateRandomNumber();
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * (this.maxNumber + 1));
  }

  public startGame(): void {
    console.log(`Welcome to the Number Guessing Game!`);
    console.log(`You have ${this.maxAttempts} attempts to guess a number between 0 and ${this.maxNumber}.`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const playRound = (attemptsLeft: number) => {
      rl.question(`Enter your guess: `, (guessInput) => {
        const guess = parseInt(guessInput, 10);

        if (isNaN(guess) || guess < 0 || guess > this.maxNumber) {
          console.log('Invalid input. Please enter a number between 0 and', this.maxNumber);
        } else {
          if (guess === this.secretNumber) {
            console.log('Congratulations! You guessed the correct number.');
            rl.close();
          } else if (attemptsLeft === 1) {
            console.log(`Sorry, you've exhausted all your attempts. The correct number was ${this.secretNumber}.`);
            rl.close();
          } else {
            const hint = guess < this.secretNumber ? 'higher' : 'lower';
            console.log(`Incorrect guess. Try again. Hint: The secret number is ${hint}.`);
            playRound(attemptsLeft - 1);
          }
        }
      });
    };

    playRound(this.maxAttempts);
  }
}

const maxNumberToGuess = 100;  // Change this to set the maximum number to guess
const game = new NumberGuessingGame(maxNumberToGuess);
game.startGame();
