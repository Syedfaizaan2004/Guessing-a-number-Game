const outputDiv = document.getElementById('output');
        const statsDiv = document.getElementById('stats');
        const startGameButton = document.getElementById('start-game');
        const playAgainButton = document.getElementById('play-again');
        const animationContainer = document.getElementById('animation-container');

        let wins = 0;
        let losses = 0;
        let totalGames = 0;
        let wrongGuesses = 0;

        function printMessage(message) {
            outputDiv.innerHTML += "<p>" + message + "</p>";
        }

        function updateStats() {
            statsDiv.innerHTML = `Games Played: ${totalGames} | Wins: ${wins} | Losses: ${losses} | Wrong Guesses: ${wrongGuesses}`;
        }

        function createConfetti() {
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.animationDelay = `${Math.random()}s`;
                animationContainer.appendChild(confetti);
            }
            setTimeout(() => {
                animationContainer.innerHTML = ''; // Clear animation after it ends
            }, 2000);
        }

        function createFireworks() {
            for (let i = 0; i < 10; i++) {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                firework.style.left = `${Math.random() * 100}%`;
                firework.style.top = `${Math.random() * 50}%`;
                firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                firework.style.animationDelay = `${Math.random()}s`;
                animationContainer.appendChild(firework);
            }
            setTimeout(() => {
                animationContainer.innerHTML = ''; // Clear animation after it ends
            }, 2000);
        }

        function createSpinners() {
            for (let i = 0; i < 15; i++) {
                const spinner = document.createElement('div');
                spinner.classList.add('spinner');
                spinner.style.left = `${Math.random() * 100}%`;
                spinner.style.top = `${Math.random() * 100}%`;
                spinner.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                spinner.style.animationDelay = `${Math.random()}s`;
                animationContainer.appendChild(spinner);
            }
            setTimeout(() => {
                animationContainer.innerHTML = ''; // Clear animation after it ends
            }, 2000);
        }

        function startGame() {
            outputDiv.innerHTML = ""; // Clear previous game output
            startGameButton.style.display = "none"; // Hide the start game button
            playAgainButton.style.display = "none"; // Hide the play again button
            wrongGuesses = 0; // Reset wrong guesses for the new game

            const max = prompt("Enter the maximum number.");
            if (max === null) {
                startGameButton.style.display = "block";
                return;
            }

            const random = Math.floor(Math.random() * max) + 1;
            let guess = prompt("Guess the number");
            if (guess === null) {
                startGameButton.style.display = "block";
                return;
            }

            totalGames++; // Increment the total games counter
            updateStats(); // Update stats after starting the game

            while (true) {
                if (guess === "quit") {
                    printMessage("User quit.");
                    losses++; // Increment the losses counter
                    break;
                }

                if (parseInt(guess) === random) {
                    printMessage("You are right! Congrats!! The random number was: " + random);
                    wins++; // Increment the wins counter

                    // Randomly select an animation to display
                    const animations = [createConfetti, createFireworks, createSpinners];
                    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                    randomAnimation();

                    break;
                } else {
                    wrongGuesses++; // Increment the wrong guesses counter
                    updateStats(); // Update stats after each wrong guess
                    if (parseInt(guess) < random) {
                        guess = prompt("Hint: Your guess was too small. Please try again.");
                    } else {
                        guess = prompt("Hint: Your guess is too large. Try again.");
                    }
                    if (guess === null) {
                        startGameButton.style.display = "block";
                        return;
                    }
                }
            }

            updateStats(); // Final update of the stats after the game ends
            playAgainButton.style.display = "block"; // Show the play again button
        }

        startGameButton.addEventListener('click', startGame);
        playAgainButton.addEventListener('click', startGame);