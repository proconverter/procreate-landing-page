document.addEventListener('DOMContentLoaded', () => {
    // --- Accordion FAQ Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            // Toggle the clicked item
            item.classList.toggle('open');
        });
    });

    // --- AJAX Form Submission Logic ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const resetFormButton = document.getElementById('reset-form-button'); // Get the reset button

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default page reload
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                formStatus.style.display = 'flex'; // Show the success message (use flex)
                form.style.display = 'none'; // Hide the form
            } else {
                // Handle server errors
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    alert(responseData["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }
        } catch (error) {
            // Handle network errors
            alert("Oops! There was a problem submitting your form.");
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    // --- NEW: Reset Logic ---
    if (resetFormButton) {
        resetFormButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the link from navigating

            // Hide the success message
            formStatus.style.display = 'none';

            // Show the form again
            form.style.display = 'flex'; // Use 'flex' since the form has display:flex

            // Reset the form fields
            form.reset();
        });
    }
});
