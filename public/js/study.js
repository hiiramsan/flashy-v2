document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.flipcard-wrapper');
    let position = 0; 
    const totalItems = cards.length;

    const positionIndicator = document.getElementById('pIndicator');
    const progressBar = document.querySelector('.progress-bar'); 

    // Función para actualizar la tarjeta visible y su estado
    function updateCarouselPosition() {
        // Mostrar solo la tarjeta en la posición actual y restablecer las demás
        cards.forEach((card, index) => {
            const flipcard = card.querySelector('.flipcard');

            if (index === position) {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none'; 
                flipcard.classList.remove('flipped'); 
            }
        });

        positionIndicator.textContent =  `${position + 1} / ${totalItems}`;
        updateProgressBar(); // Update progress bar whenever position changes
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const progressPercentage = ((position + 1) / totalItems) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function toggleFlip() {
        const currentCard = cards[position].querySelector('.flipcard');
        currentCard.classList.toggle('flipped'); 
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            position = (position + 1) % totalItems;
            updateCarouselPosition();
        } else if (event.key === 'ArrowLeft') {
            position = (position - 1 + totalItems) % totalItems;
            updateCarouselPosition();
        } else if (event.key === ' ') {
            event.preventDefault(); 
            toggleFlip(); 
        }
    });

    // Manejo de botones izquierda y derecha
    const leftButton = document.getElementById('move-left');
    const rightButton = document.getElementById('move-right');

    leftButton.addEventListener('click', () => {
        position = (position - 1 + totalItems) % totalItems;
        updateCarouselPosition();
    });

    rightButton.addEventListener('click', () => {
        position = (position + 1) % totalItems;
        updateCarouselPosition();
    });

    cards.forEach(card => {
        card.addEventListener('click', function () {
            if (card === cards[position]) { // Asegurarse que sea la carta actual
                toggleFlip(); // Voltear la carta actual al hacer clic
            }
        });
    });

    updateCarouselPosition(); // Initialize the carousel and progress bar
});


// here i'm removing the flipable functionability when you click on the star btns, and added functionality to star a carddddd
const starButtons = document.querySelectorAll('#star');
starButtons.forEach(btn => {
    btn.addEventListener('click', async function(e) {
        e.stopPropagation(); 
        const cardId = this.getAttribute('data-id');
        try {
            const response = await fetch(`/cards/${cardId}/toggle-star`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if(response.ok) {
                if(data.star) { // btn.id = 'star'
                    btn.classList.toggle('starred');
                }
            } else {
                console.log('Error while fetching data', data.message)
            }
        } catch(err) {
            console.log(err);
        }
    })
})
