document.addEventListener('DOMContentLoaded', function() {
    // Certificate data with images
    const certificateImages = [
        './assets/images/GD.jpeg',
        './assets/images/wd.png',
        './assets/images/UU.jpg',
        './assets/images/UU.jpg',
    ];

    // Initialize certificate images
    function initializeCertificateImages() {
        const certCards = document.querySelectorAll('.certification-card');
        
        certCards.forEach((card, index) => {
            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'cert-image-container';
            
            // Create image element
            const img = document.createElement('img');
            img.className = 'cert-image loading';
            img.alt = 'Certificate';
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'cert-overlay';
            overlay.innerHTML = '<ion-icon name="eye-outline" class="cert-overlay-icon"></ion-icon>';
            
            // Set image source with error handling
            img.onload = function() {
                this.classList.remove('loading');
            };
            
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/400x250/2a2a2a/ffffff?text=Certificate';
                this.classList.remove('loading');
            };
            
            img.src = certificateImages[index] || certificateImages[0];
            
            // Append elements
            imageContainer.appendChild(img);
            imageContainer.appendChild(overlay);
            
            // Wrap existing content
            const existingContent = card.innerHTML;
            const contentDiv = document.createElement('div');
            contentDiv.className = 'cert-content';
            contentDiv.innerHTML = existingContent;
            
            // Clear card and add new structure
            card.innerHTML = '';
            card.appendChild(imageContainer);
            card.appendChild(contentDiv);
        });
    }

    // Scroll animation for certificate cards
    function initializeScrollAnimation() {
        const scrollContainer = document.querySelector('.certifications-scroll-container');
        const cards = document.querySelectorAll('.certification-card');
        
        if (!scrollContainer) return;
        
        const observerOptions = {
            root: scrollContainer,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Smooth scroll behavior for certificate links
    function initializeSmoothScroll() {
        const scrollContainer = document.querySelector('.certifications-scroll-container');
        if (!scrollContainer) return;

        // Add smooth scrolling
        scrollContainer.style.scrollBehavior = 'smooth';
        
        // Handle keyboard navigation
        scrollContainer.addEventListener('keydown', function(e) {
            const scrollAmount = 100;
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollTop -= scrollAmount;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollTop += scrollAmount;
                    break;
            }
        });
    }

    // Certificate modal functionality
    function initializeCertificateModal() {
        const viewButtons = document.querySelectorAll('.cert-btn-primary');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const card = this.closest('.certification-card');
                const certImage = card.querySelector('.cert-image');
                const certTitle = card.querySelector('.cert-info h3').textContent;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'cert-modal';
                modal.innerHTML = `
                    <div class="cert-modal-content">
                        <div class="cert-modal-header">
                            <h3>${certTitle}</h3>
                            <button class="cert-modal-close">&times;</button>
                        </div>
                        <div class="cert-modal-body">
                            <img src="${certImage.src}" alt="Certificate" class="cert-modal-image">
                        </div>
                    </div>
                `;
                
                // Add modal styles
                const modalStyles = `
                    .cert-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .cert-modal.show {
                        opacity: 1;
                    }
                    
                    .cert-modal-content {
                        background: var(--bg-secondary);
                        border-radius: var(--radius-12);
                        max-width: 90%;
                        max-height: 90%;
                        overflow: hidden;
                    }
                    
                    .cert-modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                        background: var(--bg-primary);
                    }
                    
                    .cert-modal-header h3 {
                        color: var(--color-primary);
                        margin: 0;
                    }
                    
                    .cert-modal-close {
                        background: none;
                        border: none;
                        color: var(--color-primary);
                        font-size: 2rem;
                        cursor: pointer;
                        padding: 0;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .cert-modal-body {
                        padding: 0;
                    }
                    
                    .cert-modal-image {
                        width: 100%;
                        height: auto;
                        display: block;
                    }
                `;
                
                // Add styles to document
                if (!document.querySelector('#cert-modal-styles')) {
                    const styleSheet = document.createElement('style');
                    styleSheet.id = 'cert-modal-styles';
                    styleSheet.textContent = modalStyles;
                    document.head.appendChild(styleSheet);
                }
                
                // Add modal to body
                document.body.appendChild(modal);
                
                // Show modal with animation
                requestAnimationFrame(() => {
                    modal.classList.add('show');
                });
                
                // Close modal functionality
                const closeModal = () => {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                };
                
                modal.querySelector('.cert-modal-close').addEventListener('click', closeModal);
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                // Close on escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            });
        });
    }

    // Progress indicator for scroll
    function initializeScrollProgress() {
        const scrollContainer = document.querySelector('.certifications-scroll-container');
        const progressBar = document.createElement('div');
        progressBar.className = 'cert-scroll-progress';
        
        const progressStyles = `
            .cert-scroll-progress {
                position: absolute;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--raw-seinna), green);
                transition: width 0.1s ease;
                z-index: 10;
            }
        `;
        
        if (!document.querySelector('#cert-progress-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'cert-progress-styles';
            styleSheet.textContent = progressStyles;
            document.head.appendChild(styleSheet);
        }
        
        if (scrollContainer) {
            scrollContainer.style.position = 'relative';
            scrollContainer.appendChild(progressBar);
            
            scrollContainer.addEventListener('scroll', function() {
                const scrollTop = this.scrollTop;
                const scrollHeight = this.scrollHeight - this.clientHeight;
                const scrollProgress = (scrollTop / scrollHeight) * 100;
                
                progressBar.style.width = scrollProgress + '%';
            });
        }
    }

    // Initialize all functionality
    setTimeout(() => {
        initializeCertificateImages();
        initializeScrollAnimation();
        initializeSmoothScroll();
        initializeCertificateModal();
        initializeScrollProgress();
    }, 100);
});