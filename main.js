document.addEventListener('DOMContentLoaded', () => {

    // --- Unified Accordion Logic ---
    // This function handles all accordion elements on the page.
    const allAccordionItems = document.querySelectorAll('.accordion-item');

    allAccordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyOpen = item.classList.contains('open');

            // Optional: Close all other items in the same accordion block
            // This creates a "one at a time" behavior.
            const parentAccordion = item.closest('.accordion');
            if (parentAccordion) {
                parentAccordion.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
            }

            // Toggle the clicked item. If it wasn't open, open it.
            if (!currentlyOpen) {
                item.classList.add('open');
            }
        });
    });

    // --- Live Demo Logic ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    // Only run this code if the demo elements actually exist on the page
    if (dropZone && fileInput) {
        const dropContent = dropZone.querySelector('.drop-content');

        // Allow clicking the drop zone to open the file selector
        dropZone.addEventListener('click', () => fileInput.click());

        // Handle file selection from the input
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });

        // Add visual feedback for dragging a file over the zone
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault(); // This is necessary to allow a drop
            dropZone.classList.add('dragover');
        });

        // Remove visual feedback when the file leaves the zone
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        // Handle the actual file drop
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });

        function handleFileUpload(file) {
            // Basic validation for the demo
            if (!file.name.toLowerCase().endsWith('.brushset')) {
                alert('Please use a sample .brushset file for the demo.');
                return;
            }
            
            // Update the UI to show processing
            if(dropContent) {
                dropContent.innerHTML = `<h3>Processing...</h3><p>Your files are being converted.</p>`;
            }

            // Simulate a delay for the conversion process
            setTimeout(() => {
                if(dropContent) {
                    dropContent.innerHTML = `<h3>✨ Success!</h3><p>Your PNGs would be ready for download.</p>`;
                }
            }, 2500);
        }
    }

    // --- Smooth Scrolling for Anchor Links (e.g., "Get Access" button) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.error("Error finding element for smooth scroll:", error);
            }
        });
    });
});
