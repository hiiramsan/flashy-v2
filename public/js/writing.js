const flashcards = document.querySelectorAll('.write-container');
const checkBtn = document.getElementById('btn-check');
const guesserInput = document.getElementById('guesser-input');
const flashcard = flashcardData;
const feedback = document.getElementById('feedback');
const guesserContainer = document.getElementById('guesser-container');
const label = document.getElementById('label');
const feedbackCard = document.getElementById('feedback-card')
const feedbackWrong = document.getElementById('feedback-wrong');
const feedbackRight = document.getElementById('feedback-right');
const wrongCard = document.getElementById('wrong-card');
const rightCard = document.getElementById('right-card');
const continueLabel = document.getElementById('continue');


let currentCard = 0;
let totalCards = flashcardData.cards.length;
let gameState = 'onTyping'

window.addEventListener('load', ()=>{
    startSession();
})

const startSession = () => {
    flashcards[currentCard].classList.toggle('hide');
    guesserInput.focus();
}

const nextCard = () => {
  guesserInput.focus();
}

checkBtn.addEventListener('click', ()=> {
  checkAnswer();
})

addEventListener('keypress', (event)=>{
  if(event.key === 'Enter') {
    if(gameState === 'onTyping') {
      checkAnswer();
    } else if(gameState === 'onFeedback') {
      console.log('remove all feedback and put next question')
    }
  }
})

function hideGuesserContainer() {
  guesserContainer.style.display = 'none';
  label.style.display = 'none'
}

function showFeedbackContainer() {
  feedback.style.display = 'block' || 'flex'
}

function checkAnswer() {

  gameState = 'onFeedback';
  let rightChoice = flashcard.cards[currentCard].term

  if(guesserInput.value) {
    guesserContainer.classList.toggle('hide');
    if(guesserInput.value === rightChoice) {
      rightAnswer(rightChoice);
    } else {
      wrongAnswer(guesserInput.value, rightChoice)
    }
  }
}

function rightAnswer(right) {
  feedback.classList.toggle('hide');
  hideGuesserContainer();
  showFeedbackContainer();
  feedbackRight.textContent = "You got it right!"
  rightCard.classList.toggle('hide')
  rightCard.textContent = right;
  continueLabel.classList.toggle('hide');
}

function wrongAnswer(wrong, right) {
  feedback.classList.toggle('hide');
  hideGuesserContainer();
  showFeedbackContainer();

  feedbackWrong.textContent = "Are ya dumb or what?"
  feedbackRight.textContent = "Correst answer is:"
  rightCard.classList.toggle('hide')
  wrongCard.classList.toggle('hide')
  wrongCard.textContent = wrong;
  rightCard.textContent = right;
  continueLabel.classList.toggle('hide');
}














const starButtons = document.querySelectorAll("#star");
starButtons.forEach((btn) => {
  btn.addEventListener("click", async function (e) {
    e.stopPropagation();
    const cardId = this.getAttribute("data-id");
    try {
      const response = await fetch(`/cards/${cardId}/toggle-star`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        const buttons = document.querySelectorAll(
          `button[data-id="${btn.getAttribute("data-id")}"]`
        );

        buttons.forEach((button) => {
          if (data.star) {
            button.classList.add("starred"); 
          } else {
            button.classList.remove("starred"); 
          }
        });
      } else {
        console.log("Error while fetching data", data.message);
      }
    } catch (err) {
      console.log(err);
    }
  });
});


