let score: number;//game score
let streak: number;//game streak
let time: number;//game time remaining
let isGameStarted = false;//is game started
let isGameEnded = true;//is game ended
let character: string;//character to type
const characterText = document.getElementById('character-text') as HTMLSpanElement;//character display text
const scoreText = document.getElementById('score') as HTMLSpanElement;//score text
const timeText = document.getElementById('time') as HTMLSpanElement;//time remaining text
const typingText = document.getElementById('typing-text') as HTMLInputElement;//typing text field
const startButton = document.getElementById('start-button') as HTMLButtonElement;//start button
function startGame() {//start the game
    score = 0;//set score to 0
    streak = 0;//set streak to 0
    time = 60;//set time remaining to 60 seconds
    isGameStarted = true;//set is game started to true
    isGameEnded = false;//set is game ended to false
    generateRandomCharacter();//generate random character
    scoreText.textContent = score.toString();//update text contents
    timeText.textContent = time.toString();
    typingText.focus();//focus typing text
    startButton.disabled = true;//disable start button
    const updateTime = () => {//update time every second
        time--;//decrease time by 1
        timeText.textContent = time.toString();//update time text content
        if (time === 0) {//if time is 0
            clearInterval(updateTimeInterval);//clear interval
            isGameStarted = false;//set is game started to false 
            isGameEnded = true;//set is game ended to true 
            startButton.disabled = false;//enable start button
        }
    }
    const updateTimeInterval = setInterval(updateTime, 1000);//update time every second
}
function generateRandomCharacter() {//generate random character
    const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';//lowercase letters
    const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';//uppercase letters
    const numbers = '0123456789';//numeric digits
    const symbols = '`~!@#$%^&*()_+-={}|[]\\:";\'><?,./';//symbols (special characters)
    const alphabet = lowercaseAlphabet + uppercaseAlphabet;//lowercase and uppercase letters of alphabet
    const lettersAndNumbers = alphabet + numbers;//alphabet and numeric digits
    const charactersList = lettersAndNumbers + symbols;//alphabet, numeric digits, and symbols
    character = lowercaseAlphabet[Math.floor(Math.random() * alphabet.length)];//get random character from set 
    characterText.textContent = character;//set character to type to random character
}
startButton.addEventListener('click', () => {//when start button is clicked
    if (!isGameStarted || isGameEnded) {//if game is not started or game is ended
        startGame();//start the game
        startButton.disabled = true;//disable start button
    }
});
typingText.addEventListener('input', () => {//when key is pressed in typing text field
    if (isGameStarted && !isGameEnded) {//if game is started and game is not ended
        const text: string = typingText.value;//set text to input text
        if (text === character) {//if input text is equal to character to type
            streak++;//increase streak by 1
            score += streak;//increase score by streak
            typingText.value = '';//clear typing text input value
            scoreText.textContent = score.toString();//update sconre text content
            generateRandomCharacter();//generate random character
        }
        else {//if wrong key is pressed
            streak = 0;//reset streak to 0
        }
    }
});