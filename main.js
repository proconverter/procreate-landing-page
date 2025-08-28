document.addEventListener('DOMContentLoaded', () => {
    
    // --- Accordion Logic ---
    // This function can be reused for any accordion group on the page
    function setupAccordion(containerSelector) {
        const accordionItems = document.querySelectorAll(`${containerSelector} .accordion-item`);

        if (accordionItems.length === 0) return;

        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-question');
            question.addEventListener('click', () => {
                const wasOpen = item.classList.contains('open');

                // Close all items within this specific accordion group
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                });

                // If the clicked item wasn't already open, open it
                if (!wasOpen) {
                    item.classList.toggle('open');
                }
            });
        });
    }

    // Setup both accordion sections
    setupAccordion('.pricing-accordion');
    setupAccordion('.faq');


    // --- AJAX Form Submission Logic ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const resetFormButton = document.getElementById('reset-form-button');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.style.display = 'flex';
                form.style.display = 'none';
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    alert(responseData["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form.");
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    if (resetFormButton) {
        resetFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            formStatus.style.display = 'none';
            form.style.display = 'flex';
            form.reset();
        });
    }
});
