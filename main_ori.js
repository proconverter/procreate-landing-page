document.addEventListener('DOMContentLoaded', () => {
    // --- Live Demo Logic ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const loadingContainer = document.getElementById('loadingContainer');
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.getElementById('loadingText');
    const demoResults = document.getElementById('demoResults');
    const resultImages = document.getElementById('resultImages');

    // Sample images that will be shown as results
    const sampleResults = [
        { src: 'demo-assets/1.png', name: 'Stamp 1' },
        { src: 'demo-assets/1a.png', name: 'Stamp 2' },
        { src: 'demo-assets/2ed.png', name: 'Stamp 3' },
        { src: 'demo-assets/3.png', name: 'Stamp 4' },
        { src: 'demo-assets/5.png', name: 'Stamp 5' }
    ];

    // Loading messages that will cycle during the demo
    const loadingMessages = [
        'Analyzing file...',
        'Extracting stamp images...',
        'Processing brushes...',
        'Generating PNGs...',
        'Almost done...'
    ];

    // Click to select file
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection via input
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    function handleFileUpload(file) {
        // Check if it's the sample file or any .brushset file
        if (!file.name.toLowerCase().includes('.brushset') && !file.name.toLowerCase().includes('sample')) {
            alert('Please use the Sample.brushset file or any .brushset file to see the demo!');
            return;
        }

        // Hide drop zone and show loading
        dropZone.style.display = 'none';
        loadingContainer.style.display = 'block';
        demoResults.style.display = 'none';

        // Start the demo animation
        startDemoAnimation();
    }

    function startDemoAnimation() {
        let progress = 0;
        let messageIndex = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random progress increments
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show completion and then results
                setTimeout(() => {
                    loadingText.textContent = 'Conversion complete!';
                    setTimeout(showResults, 800);
                }, 500);
            }
            
            // Update progress bar
            progressFill.style.width = progress + '%';
            
            // Cycle through loading messages
            if (Math.random() > 0.7 && messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }, 300);
    }

    function showResults() {
        // Hide loading and show results
        loadingContainer.style.display = 'none';
        demoResults.style.display = 'block';
        
        // Clear previous results
        resultImages.innerHTML = '';
        
        // Add each result image with staggered animation
        sampleResults.forEach((result, index) => {
            setTimeout(() => {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'result-image';
                imageDiv.style.animationDelay = `${index * 0.2}s`;
                
                const img = document.createElement('img');
                img.src = result.src;
                img.alt = result.name;
                img.onerror = () => {
                    // Fallback if image doesn't load
                    img.src = `https://via.placeholder.com/150x150/667eea/ffffff?text=${result.name}`;
                };
                
                imageDiv.appendChild(img);
                resultImages.appendChild(imageDiv);
            }, index * 200);
        });
        
        // Scroll to results after a short delay
        setTimeout(() => {
            demoResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
    }

    // Reset demo function (for testing purposes)
    window.resetDemo = function() {
        dropZone.style.display = 'block';
        loadingContainer.style.display = 'none';
        demoResults.style.display = 'none';
        progressFill.style.width = '0%';
        loadingText.textContent = loadingMessages[0];
        resultImages.innerHTML = '';
        fileInput.value = '';
    };

    // --- Package Accordion Logic ---
    const packageHeaders = document.querySelectorAll('.package-header');
    
    packageHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            const isActive = accordion.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.package-accordion').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordion.classList.add('active');
            }
        });
    });

    // --- FAQ Accordion Logic ---
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

    // --- Contact Form Logic ---
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
                headers: {
                    'Accept': 'application/json'
                }
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

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Add some visual feedback for CTA buttons ---
    document.querySelectorAll('.cta-button, .package-cta, .cta-button-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

