// profile menu

const profile = document.querySelector('.user-info');
const dropdown = document.querySelector('.dropdown__wrapper');
const middleCircle = document.querySelector('.middle-circle');

profile.addEventListener('click', () => {
  dropdown.classList.remove('none');
  dropdown.classList.toggle('hide');
  middleCircle.classList.toggle('active-pfp');
});

document.addEventListener("click", (event) => {
  const isClickInsideDropdown = dropdown.contains(event.target);
  const isProfileClicked = profile.contains(event.target);

  if (!isClickInsideDropdown && !isProfileClicked) {
    dropdown.classList.add('hide');
    dropdown.classList.add('dropdown__wrapper--fade-in');
    middleCircle.classList.remove('active-pfp');
  }
});

// create section: background choicer

const backgroundOptions = document.querySelectorAll('.background-option');
const selectedBackgroundInput = document.getElementById('selected-background');

backgroundOptions.forEach(option => {
  option.addEventListener('click', () => {
    backgroundOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedBackgroundInput.value = option.getAttribute('data-bg');
  });
});

// create section: resizable textarea

document.addEventListener('input', function (event) {
  if (!event.target.classList.contains('resizable-textarea')) return;
  autoResize(event.target);
});

function autoResize(textarea) {
  textarea.style.height = '40px';
  textarea.style.height = textarea.scrollHeight + 'px';
}

document.querySelectorAll('.resizable-textarea').forEach(textarea => {
  autoResize(textarea);
});

// scripting for card creating

let cardCount = 3;

function addCard(){
  const cardContainer = document.getElementById('cards-container');
  const cardHtml = 
  `
  <div class="card">
          <div class="card-number">${cardCount + 1}</div>
          <div class="card-inputs">
            <textarea class="resizable-textarea" name="carsd[${cardCount}][term]" id="term" placeholder="Term"></textarea>
            <textarea class="resizable-textarea" name="cards[${cardCount}][definition]" id="definition" placeholder="Definition"></textarea>
          </div>
          <i class="fas fa-trash remove-card" onclick="removeCard(this)"></i>
        </div>
  `
  cardContainer.insertAdjacentHTML('beforeend', cardHtml);
  cardCount++;
  fixIndexes();
}

async function removeCard(element) {
  const card = element.closest('.card');
  if(cardCount > 3) {
    card.remove();
    cardCount--;
    fixIndexes();
  } else {

    document.getElementById('cardsLabel').style = "color: red";
    await new Promise(resolve => setTimeout(resolve, 3000));
    document.getElementById('cardsLabel').style = "color: black";
  }
  
}

function fixIndexes() {
  let i = 1;
  document.querySelectorAll('.card-number').forEach(cardNum => {
    cardNum.innerHTML = i;
    i++;
  })
}

// delete flashcard logic

function deleteFlashcardBtn() {
  document.getElementById('deleteWarning').style.display = "block";
}

document.getElementById('delete').addEventListener('click', ()=>{
  document.getElementById('deleteWarning').style.display = 'none';
})

function cancelDelete() {
  document.getElementById('deleteWarning').style.display = 'none';
}