const nameF = document.getElementById('name-input');
const form = document.getElementById('create-form');
const errorElement = document.getElementById('error-message');
const errorText = document.getElementById('error-message-text');

// Error icon template function for the name input
function createErrorIcon() {
    const icon = document.createElement('i');
    icon.className = 'fas fa-exclamation-circle error-icon'; // Add 'error-icon' class for CSS styling
    return icon;
}

// CHECKS IF THERE ARE ANY ERRORS IN THE FORM
form.addEventListener('submit', (e) => {
    let messages = [];

    // Validate Name Input
    if (nameF.value === '' || nameF.value == null) {
        messages.push('Name is required');

        // Add error icon if not already present
        if (!nameF.parentElement.querySelector('.fas.fa-exclamation-circle')) {
            nameF.parentElement.appendChild(createErrorIcon());
        }
    }

    // Validate Cards Inputs
    document.querySelectorAll('#cards-container .card').forEach((card, index) => {
        const term = card.querySelector('.card-inputs textarea[name$="[term]"]');
        const definition = card.querySelector('.card-inputs textarea[name$="[definition]"]');

        if (term.value === '' || term.value == null) {
            messages.push(`Card ${index + 1} term is required`);
            term.classList.add('validation-error');  // Just add the validation-error class, no icon
        }

        if (definition.value === '' || definition.value == null) {
            messages.push(`Card ${index + 1} definition is required`);
            definition.classList.add('validation-error');  // Just add the validation-error class, no icon
        }
    });

    // Display Error Messages
    if (messages.length > 0) {
        e.preventDefault();
        errorText.innerText = messages.join(', ');
        errorElement.style.display = 'flex';
        console.log('error');
    }
});

// REMOVE ICON WHEN CHANGING THE VALUE OF THE NAME INPUT
nameF.addEventListener('keypress', (e) => {

    // Remove the icon if it exists
    const existingIcon = e.target.parentElement.querySelector('.fas.fa-exclamation-circle');
    if (existingIcon) {
        existingIcon.remove();
    }
});

// REMOVE VALIDATION-ERROR CLASS FOR CARD TEXTAREAS ON INPUT
document.querySelectorAll('textarea').forEach((input) => {
    input.addEventListener('keypress', (e) => {
        e.target.classList.remove('validation-error');
    });
});
