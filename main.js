document.addEventListener('DOMContentLoaded', () => {

    // --- Unified Accordion Logic ---
    const allAccordions = document.querySelectorAll('.accordion-item');

    allAccordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // This part closes any other open accordion item in the same group
            // which is good for FAQs but might be optional for pricing.
            // For now, it's a clean user experience.
            item.parentElement.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });

            // Toggle the clicked item
            if (!isOpen) {
                item.classList.add('open');
            } else {
                item.classList.remove('open');
            }
        });
    });

    // --- Live Demo Logic ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    if (dropZone && fileInput) {
        const dropContent = dropZone.querySelector('.drop-content');

        // Click to select file
        dropZone.addEventListener('click', () => fileInput.click());

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
        });

        // Drag and drop functionality
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
        });

        function handleFileUpload(file) {
            if (!file.name.toLowerCase().endsWith('.brushset')) {
                alert('Please use a .brushset file for the demo.');
                return;
            }
            
            // Simulate processing
            dropContent.innerHTML = `<h3>Processing...</h3><p>Your files are being converted.</p>`;

            // Simulate success after a delay
            setTimeout(() => {
                dropContent.innerHTML = `<h3>✨ Success!</h3><p>Your PNGs would be ready for download.</p>`;
            }, 2500);
        }
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
