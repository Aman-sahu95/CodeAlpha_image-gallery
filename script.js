document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let filteredItems = [];
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get all currently visible items
            filteredItems = Array.from(document.querySelectorAll('.gallery-item[style="display: block;"], .gallery-item:not([style])'));
            currentIndex = filteredItems.indexOf(item);
            
            lightbox.style.display = 'flex';
            lightboxImg.src = item.querySelector('img').src;
            lightboxImg.alt = item.querySelector('img').alt;
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateLightboxImage();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateLightboxImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % filteredItems.length;
                updateLightboxImage();
            }
        }
    });
    
    function updateLightboxImage() {
        const imgSrc = filteredItems[currentIndex].querySelector('img').src;
        const imgAlt = filteredItems[currentIndex].querySelector('img').alt;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
    }
});