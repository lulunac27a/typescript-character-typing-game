let score: number; //game score
let scoreMultiplier: number; //score multiplier based on game mode
let streak: number; //game streak
let time: number; //game time remaining
let timeMultiplier: number; //time multiplier for pressing correct key quickly
let lastTimePressed: number; //last time key was pressed correctly
let timePressed: number; //time last key was pressed correctly
let isGameStarted = false; //is game started
let isGameEnded = true; //is game ended
let characterToType: string; //character to type
const characterToTypeText = document.getElementById(
  "character-to-type-text",
) as HTMLSpanElement; //character display text
const scoreText = document.getElementById("score") as HTMLSpanElement; //score text
const timeText = document.getElementById("time-remaining") as HTMLSpanElement; //time remaining text
const typingText = document.getElementById("typing-text") as HTMLInputElement; //typing text field
const startButton = document.getElementById(
  "start-button",
) as HTMLButtonElement; //start button
const gameMode = document.getElementById("mode") as HTMLSelectElement; //game mode
const timeLimit = document.getElementById("time-limit") as HTMLSelectElement; //time limit selection
function startGame(): void {
  //start the game
  score = 0; //set score to 0
  streak = 0; //set streak to 0
  time = parseInt(timeLimit.value, 10); //set time remaining based on selected time limit value
  timeMultiplier = 1; //set time multiplier to 1
  isGameStarted = true; //set is game started to true
  isGameEnded = false; //set is game ended to false
  lastTimePressed = performance.now(); //set last time key was pressed to current performance time
  generateRandomCharacter(); //generate random character
  scoreText.textContent = score.toString(); //update text contents
  timeText.textContent = time.toString();
  typingText.focus(); //focus typing text
  startButton.disabled = true; //disable start button
  typingText.disabled = false; //enable typing text
  gameMode.disabled = true; //disable game mode selection
  timeLimit.disabled = true; //disable time limit selection
  const updateTime: () => void = (): void => {
    //update time every second
    time--; //decrease time by 1
    timeText.textContent = time.toString(); //update time text content
    if (time === 0) {
      //if time is 0
      clearInterval(updateTimeInterval); //clear interval
      isGameStarted = false; //set is game started to false
      isGameEnded = true; //set is game ended to true
      startButton.disabled = false; //enable start button
      typingText.disabled = true; //disable typing text
      gameMode.disabled = false; //enable game mode selection
      timeLimit.disabled = false; //enable time limit selection
    }
  };
  const updateTimeInterval = setInterval(updateTime, 1000); //update time every second
}
function generateRandomCharacter(): void {
  //generate random character
  const lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz"; //lowercase letters
  const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //uppercase letters
  const numbers = "0123456789"; //numeric digits
  const symbols = "`~!@#$%^&*()_+-={}|[]\\:\";'><?,./"; //symbols (special characters)
  const alphabet = lowercaseAlphabet + uppercaseAlphabet; //lowercase and uppercase letters of alphabet
  const lettersAndNumbers = alphabet + numbers; //alphabet and numeric digits
  const charactersList = lettersAndNumbers + symbols; //alphabet, numeric digits, and symbols
  switch (
    gameMode.value //set character to type based on selected game mode
  ) {
    case "lowercase-letters": //lowercase letters
      characterToType =
        lowercaseAlphabet[Math.floor(Math.random() * lowercaseAlphabet.length)];
      scoreMultiplier = 1; //1x score multiplier
      break;
    case "all-letters": //all letters (uppercase and lowercase letters)
      characterToType = alphabet[Math.floor(Math.random() * alphabet.length)];
      scoreMultiplier = 2; //2x score multiplier
      break;
    case "letters-and-numbers": //letters and numbers
      characterToType =
        lettersAndNumbers[Math.floor(Math.random() * lettersAndNumbers.length)];
      scoreMultiplier = 3; //3x score multiplier
      break;
    case "letters-numbers-and-symbols": //all supported characters (letters, numbers and symbols)
      characterToType =
        charactersList[Math.floor(Math.random() * charactersList.length)];
      scoreMultiplier = 4; //4x score multiplier
      break;
    default: //default case
      //use the same lowercase letters case
      characterToType =
        lowercaseAlphabet[Math.floor(Math.random() * lowercaseAlphabet.length)];
      scoreMultiplier = 1; //1x score multiplier
      break;
  }
  characterToTypeText.textContent = characterToType; //set character to type to random character
}
startButton.addEventListener("click", (): void => {
  //when start button is clicked
  if (!isGameStarted || isGameEnded) {
    //if game is not started or game is ended
    startGame(); //start the game
    startButton.disabled = true; //disable start button
    typingText.disabled = false; //enable typing text
    gameMode.disabled = true; //disable game mode selection
    timeLimit.disabled = true; //disable time limit selection
  }
});
typingText.addEventListener("input", (): void => {
  //when key is pressed in typing text field
  if (isGameStarted && !isGameEnded) {
    //if game is started and game is not ended
    const text: string = typingText.value; //set text to input text
    if (text === characterToType) {
      //if input text is equal to character to type (correct key is pressed)
      timePressed = performance.now(); //set time last key was pressed to current performance time
      timeMultiplier = 1 + 1 / (timePressed - lastTimePressed + 1000); //set time multiplier based on how fast the key was pressed correctly
      lastTimePressed = performance.now(); //set last time key was pressed to current performance time
      streak++; //increase streak by 1
      score += Math.round(streak * scoreMultiplier); //increase score by streak times score multiplier
      typingText.value = ""; //clear typing text input value
      scoreText.textContent = score.toLocaleString("en-US"); //update score text content with commas as thousands seperator
      generateRandomCharacter(); //generate random character
    } else {
      //if wrong key is pressed
      streak = 0; //reset streak to 0
    }
  }
});
