const boxWrapper = document.querySelector(".box-wrapper");
const resetBtn = document.querySelector(".reset");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess span");
const typingInput = document.querySelector(".typing-input");
const wrongLetter = document.querySelector(".wrong-letter span");

let word;
let incorrectLetters = [];
let rightLetters = [];
let maxGuesses;

function randomWord() {
  //getting random object from wordlist
  const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randomObj.word; //getting word from that random object
  maxGuesses = 8;
  incorrectLetters = [];
  rightLetters = [];

  hint.innerText = randomObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += ` <input type="text" disabled
            class="w-[70px] h-[70px] border border-2 border-gray-300 rounded-md outline-none text-center text-teal-500 uppercase"
          ></input>`;
  }
  boxWrapper.innerHTML = html;
}
randomWord();

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !rightLetters.includes(`${key}`)
  ) {
    if (word.includes(key)) {
      //if user letter found in the word
      for (let i = 0; i < word.length; i++) {
        //showing matched letter in the input value
        if (word[i] === key) {
          rightLetters.push(key);
          boxWrapper.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (rightLetters.length === word.length) {//if user found all letters
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      randomWord(); //caling randomWord function so the game resets
    } else if (maxGuesses < 1) {
      //If user does not find all the letters
      alert("Game Over");
      for (let i = 0; i < word.length; i++) {
        //Show all letters in the input
        boxWrapper.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
boxWrapper.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
