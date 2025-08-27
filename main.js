document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if the current item is already open
            const isOpen = item.classList.contains('open');

            // Optional: Close all other open items
            // faqItems.forEach(otherItem => {
            //     otherItem.classList.remove('open');
            // });

            // If it wasn't open, open it. If it was open, the line above already closed it.
            if (!isOpen) {
                item.classList.add('open');
            } else {
                item.classList.remove('open');
            }
        });
    });
});
