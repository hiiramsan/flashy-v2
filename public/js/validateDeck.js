const nameF = document.getElementById('name-input');
const form = document.getElementById('create-form');
const errorElement = document.getElementById('error-message');
const errorText = document.getElementById('error-message-text');


form.addEventListener('submit', (e) => {
    let messages = [];
    if(nameF.value === '' || nameF.value == null) {   
        messages.push('Name is required');
    }

    document.querySelectorAll('#cards-container .card').forEach((card, index) => {
        const term = card.querySelector('.card-inputs textarea[name$="[term]"]');
        const definition = card.querySelector('.card-inputs textarea[name$="[definition]"]');

        if (term.value === '' || term.value == null) {   
            messages.push(`Card ${index + 1} term is required`);
        } 
        if (definition.value === '' || definition.value == null) {   
            messages.push(`Card ${index + 1} definition is required`);
        }
    });

    if(messages.length > 0) {   
        e.preventDefault();
        errorText.innerText = messages.join(', ');
        errorElement.style.display = 'flex';
        console.log('error');
    }
});