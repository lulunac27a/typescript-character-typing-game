let score: number;
let streak: number;
let time: number;
let isGameStarted = false;
let isGameEnded = true;
let character: string;
const characterText = document.getElementById('character-text') as HTMLSpanElement;
const scoreText = document.getElementById('score') as HTMLSpanElement;
const timeText = document.getElementById('time') as HTMLSpanElement;
const typingText = document.getElementById('typing-text') as HTMLInputElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
function startGame() {
    score = 0;
    streak = 0;
    time = 60;
    isGameStarted = true;
    isGameEnded = false;
    generateRandomCharacter();
    scoreText.textContent = score.toString();
    timeText.textContent = time.toString();
    typingText.focus();
    startButton.disabled = true;
    const updateTime = () => {
        time--;
        timeText.textContent = time.toString();
        if (time === 0) {
            clearInterval(updateTimeInterval);
            isGameStarted = false;
            isGameEnded = true;
            startButton.disabled = false;
        }
    }
    const updateTimeInterval = setInterval(updateTime, 1000);
}
function generateRandomCharacter() {
    const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '`~!@#$%^&*()_+-={}|[]\\:";\'><?,./';
    const alphabet = lowercaseAlphabet + uppercaseAlphabet;
    const lettersAndNumbers = alphabet + numbers;
    const charactersList = lettersAndNumbers + symbols;
    character = lowercaseAlphabet[Math.floor(Math.random() * alphabet.length)];
    characterText.textContent = character;
}
startButton.addEventListener('click', () => {
    if (!isGameStarted || isGameEnded) {
        startGame();
        startButton.disabled = true;
    }
});
typingText.addEventListener('input', () => {
    if (isGameStarted && !isGameEnded) {
        const text: string = typingText.value;
        if (text === character) {
            streak++;
            score += streak;
            typingText.value = '';
            scoreText.textContent = score.toString();
            generateRandomCharacter();
        }
        else {
            streak = 0;
        }
    }
});