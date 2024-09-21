document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.flipcard-wrapper');
    let position = 0; 
    const totalItems = cards.length;
  
    const positionIndicator = document.getElementById('pIndicator')

    function updateCarouselPosition() {
      cards.forEach((card, index) => {
        const flipcard = card.querySelector('.flipcard');
  
        if (index === position) {
          // Carta actual en el centro
          card.style.transform = 'translateX(0) scale(1)';
          card.style.zIndex = 1;
          card.style.opacity = 1;
          card.classList.add('flipable');
        } else if (index === (position - 1 + totalItems) % totalItems) {
          // Carta anterior ligeramente desplazada a la izquierda
          card.style.transform = 'translateX(-120px) scale(0.9)';
          card.style.zIndex = 0;
          card.style.opacity = 0.4;
        } else if (index === (position + 1) % totalItems) {
          // Carta siguiente ligeramente desplazada a la derecha
          card.style.transform = 'translateX(120px) scale(0.9)';
          card.style.zIndex = 0;
          card.style.opacity = 0.4;
        } else {
          // Cartas que están más lejos
          card.style.transform = 'translateX(300px) scale(0.8)';
          card.style.opacity = 0;
        }
  
        // Siempre restablecer las tarjetas que no están en el centro a su estado original (sin flip)
        if (index !== position) {
          flipcard.classList.remove('flipped');
          card.classList.remove('flipable');
        }
      });

      positionIndicator.textContent = ` ${position + 1} / ${totalItems}`;

    }
  
    // Manejo de teclas
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          position = (position + 1) % totalItems;
          updateCarouselPosition();
        } else if (event.key === 'ArrowLeft') {
          position = (position - 1 + totalItems) % totalItems;
          updateCarouselPosition();
        } else if (event.key === ' ') {
          event.preventDefault();
          const currentCard = cards[position].querySelector('.flipcard');
          currentCard.classList.toggle('flipped');
        }
      });

      // Manejo de botones izquiera y derecha
    const leftButton = document.getElementById('move-left');
    const rightButton = document.getElementById('move-right');

    leftButton.addEventListener('click', ()=>{
      position = (position - 1 + totalItems) % totalItems;
      updateCarouselPosition();
    })

    rightButton.addEventListener('click', ()=>{
      position = (position + 1) % totalItems;
      updateCarouselPosition();
    })
      
  
    // Manejo del clic para voltear la tarjeta
    cards.forEach(card => {
      card.addEventListener('click', function () {
        if(card.classList.contains('flipable')) {
          const flipcard = card.querySelector('.flipcard');
          flipcard.classList.toggle('flipped');
        }
        
      });
    });
  
    updateCarouselPosition(); // Inicializar la posición del carrusel
  });
  