const flashcards = document.querySelectorAll('.write-container');
const checkBtn = document.getElementById('btn-check');
const guesserInput = document.querySelectorAll('#guesser-input');
const flashcard = flashcardData;
const feedbacks = document.querySelectorAll('#feedback');
const guesserContainers = document.querySelectorAll('#guesser-container');
const labels = document.querySelectorAll('#label');
const feedbackCard = document.querySelectorAll('#feedback-card')
const feedbackWrong = document.querySelectorAll('#feedback-wrong');
const feedbackRight = document.querySelectorAll('#feedback-right');
const wrongCard = document.querySelectorAll('#wrong-card');
const rightCard = document.querySelectorAll('#right-card');
const continueLabel = document.querySelectorAll('#continue');


let currentCard = 0;
let totalCards = flashcardData.cards.length;
let gameState = 'onTyping'

window.addEventListener('load', ()=>{
  showQuestion();
})

const showQuestion = () => {
  flashcards.forEach(fl =>{
    fl.classList.add('hide');
  })

    flashcards[currentCard].classList.toggle('hide');
    guesserContainers[currentCard].children[0].focus();
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
      nextQuestion();
    }
  }
})

function hideGuesserContainer() {
  guesserContainers[currentCard].style.display = 'none';
  labels[currentCard].style.display = 'none'
}

function showGuesserContainer() {
  guesserContainers[currentCard].style.display = 'block' || 'flex';
  labels[currentCard].style.display = 'block' || 'flex'
}

function showFeedbackContainer() {
  feedbacks[currentCard].style.display = 'block' || 'flex'
}

function hideFeedbackContainer() {
  feedbacks[currentCard].style.display = 'none' 
}

function checkAnswer() {
  console.log('CHECKING ANSWER')
  gameState = 'onFeedback';
  let rightChoice = flashcard.cards[currentCard].term

  if(guesserInput[currentCard].value) {
    guesserContainers[currentCard].classList.toggle('hide');
    if(guesserInput[currentCard].value === rightChoice) {
      rightAnswer(rightChoice);
    } else {
      wrongAnswer(guesserInput[currentCard].value, rightChoice)
    }
  } else {
    console.log('got no answwer')
  }
}

function rightAnswer(right) {
  console.log('u got it wrright')
  feedbacks[currentCard].classList.toggle('hide');
  hideGuesserContainer();
  showFeedbackContainer();
  feedbackRight[currentCard].textContent = "You got it right!"
  rightCard[currentCard].classList.toggle('hide')
  rightCard[currentCard].textContent = right;
  continueLabel[currentCard].classList.toggle('hide');
}

function wrongAnswer(wrong, right) {
  console.log('u got it wrong')
  feedbacks[currentCard].classList.toggle('hide');
  hideGuesserContainer();
  showFeedbackContainer();

  feedbackWrong[currentCard].textContent = "Are ya dumb or what?"
  feedbackRight[currentCard].textContent = "Correst answer is:"
  rightCard[currentCard].classList.toggle('hide')
  wrongCard[currentCard].classList.toggle('hide')
  wrongCard[currentCard].textContent = wrong;
  rightCard[currentCard].textContent = right;
  continueLabel[currentCard].classList.toggle('hide');
}

function nextQuestion() {
  gameState = 'onTyping';
  currentCard++;
  showQuestion();
  hideFeedbackContainer();
  showGuesserContainer();
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


