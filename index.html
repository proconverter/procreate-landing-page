document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Logic (Handles both Packages and FAQ) ---
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');

            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // If this accordion shouldn't close others, just toggle it.
                // Otherwise, close all others first. For now, we'll close others.
                items.forEach(otherItem => {
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
    });


    // --- Live Demo Logic ---
    // Note: The new design doesn't have all the demo elements from the first version.
    // This script is ready for when you add them back to the HTML.
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const loadingContainer = document.getElementById('loadingContainer');
    const demoResults = document.getElementById('demoResults');
    const resultImages = document.getElementById('resultImages');

    // This logic will only run if the demo elements exist on the page
    if (dropZone && fileInput && loadingContainer && demoResults && resultImages) {
        
        // Click to select file
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
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
            if (e.dataTransfer.files.length > 0) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });

        function handleFileUpload(file) {
            // Simple validation for the demo
            if (!file.name.toLowerCase().endsWith('.brushset')) {
                alert('Please use a .brushset file for the demo.');
                return;
            }
            
            // Hide drop zone and show loading (or your animation)
            dropZone.style.display = 'none';
            loadingContainer.style.display = 'block';
            loadingContainer.textContent = 'Processing...'; // Simple text for now

            // Simulate processing delay
            setTimeout(() => {
                loadingContainer.style.display = 'none';
                demoResults.style.display = 'block';
                resultImages.innerHTML = `<p>✨ Success! Your PNGs would appear here.</p>`;
                demoResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }
    }


    // --- Contact Form Logic ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

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
                formStatus.style.display = 'block';
                form.style.display = 'none';
            } else {
                alert("There was a problem submitting your form.");
            }
        } catch (error) {
            alert("There was a problem submitting your form.");
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
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
