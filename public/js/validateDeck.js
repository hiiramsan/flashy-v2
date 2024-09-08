const nameF = document.getElementById('name-input');
const form = document.getElementById('create-form');
const errorElement = document.getElementById('error-message');
const errorText = document.getElementById('error-message-text');

form.addEventListener('submit', (e) => {
    let messages = [];
    if(nameF.value === '' || nameF.value == null) {   
        messages.push('Name is required');
    }

    if(messages.length > 0) {   
        e.preventDefault();
        errorText.innerText = messages.join(', ');
        errorElement.style.display = 'flex';
        console.log('error');
    }
});