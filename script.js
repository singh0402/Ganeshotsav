// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.event-card, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Ensure events are visible on all devices
    const eventCards = document.querySelectorAll('.event-card');
    
    // Force events to be visible on all devices
    eventCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
    });
    
    // Force flexbox layout on mobile
    if (window.innerWidth <= 768) {
        const eventsGrid = document.querySelector('.events-grid');
        if (eventsGrid) {
            eventsGrid.style.display = 'flex';
            eventsGrid.style.flexDirection = 'column';
            eventsGrid.style.visibility = 'visible';
            eventsGrid.style.opacity = '1';
        }
    }
    
    // Force show events after a short delay to override any CSS conflicts
    setTimeout(() => {
        forceShowEvents();
    }, 100);
    
    // Also force show events after a longer delay to ensure they're visible
    setTimeout(() => {
        forceShowEvents();
    }, 500);
});

// Handle window resize for mobile responsiveness
window.addEventListener('resize', () => {
    const eventsGrid = document.querySelector('.events-grid');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Always ensure events are visible
    eventCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
    });
    
    if (window.innerWidth <= 768) {
        if (eventsGrid) {
            eventsGrid.style.display = 'flex';
            eventsGrid.style.flexDirection = 'column';
            eventsGrid.style.visibility = 'visible';
            eventsGrid.style.opacity = '1';
        }
    } else {
        if (eventsGrid) {
            eventsGrid.style.display = 'grid';
            eventsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            eventsGrid.style.visibility = 'visible';
            eventsGrid.style.opacity = '1';
        }
    }
});

// Form validation and submission
const registrationForm = document.getElementById('registrationForm');
const contactForm = document.getElementById('contactForm');

// Registration form handling
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate phone format (Indian phone numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showNotification('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    
    // Check if at least one event is selected
    const selectedEvents = formData.getAll('events');
    if (selectedEvents.length === 0) {
        showNotification('Please select at least one event to register for.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Registration submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    this.reset();
    
    // Registration data would be sent to server in real app
});

// Contact form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.contactName || !data.contactEmail || !data.contactSubject || !data.contactMessage) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
    
    // Contact data would be sent to server in real app
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
}

// Add CSS animations for notifications and critical event visibility overrides
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* CRITICAL: Force events to be visible on all devices */
    #events {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: visible !important;
        position: relative !important;
        z-index: 1 !important;
    }
    
    .events-grid {
        display: flex !important;
        flex-direction: column !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: visible !important;
        position: relative !important;
        z-index: 1 !important;
    }
    
    .event-card {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: visible !important;
        position: relative !important;
        z-index: 1 !important;
    }
    
    /* Mobile-specific overrides */
    @media (max-width: 768px) {
        #events {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            padding: 60px 0 !important;
        }
        
        .events-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 2rem 0 !important;
            padding: 0 !important;
        }
        
        .event-card {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 1.5rem 0 !important;
            padding: 1.5rem !important;
        }
    }
`;
document.head.appendChild(style);

// Event counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h3');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat items for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => counterObserver.observe(item));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const ganeshaImage = document.querySelector('.ganesha-image');
    
    if (hero && ganeshaImage) {
        const rate = scrolled * -0.3;
        ganeshaImage.style.transform = `translateY(${rate}px) scale(1)`;
    }
});

// Add loading animation for forms
function addLoadingState(form, button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    // Simulate processing time
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000);
}

// Add loading states to forms
registrationForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    addLoadingState(this, submitBtn);
});

contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    addLoadingState(this, submitBtn);
});

// Add hover effects for event cards
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-copy functionality for contact information
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item p');
    
    contactItems.forEach(item => {
        if (item.textContent.includes('@') || item.textContent.includes('+')) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Failed to copy to clipboard', 'error');
                });
            });
        }
    });
});

// Countdown timer for registration deadline
function updateCountdown() {
    const deadline = new Date('August 25, 2025 23:59:59').getTime();
    const now = new Date().getTime();
    const distance = deadline - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        const countdownElement = document.querySelector('.countdown-timer');
        if (countdownElement) {
            const countdownNumbers = countdownElement.querySelectorAll('.countdown-number');
            if (countdownNumbers.length >= 4) {
                countdownNumbers[0].textContent = days;
                countdownNumbers[1].textContent = hours;
                countdownNumbers[2].textContent = minutes;
                countdownNumbers[3].textContent = seconds;
            }
        }
    } else {
        // Registration deadline passed
        const countdownElement = document.querySelector('.countdown-timer');
        if (countdownElement) {
            countdownElement.innerHTML = '<div class="countdown-expired">Registration Closed</div>';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// Force show all events function
function forceShowEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (eventsGrid) {
        eventsGrid.style.display = 'flex';
        eventsGrid.style.flexDirection = 'column';
        eventsGrid.style.visibility = 'visible';
        eventsGrid.style.opacity = '1';
        eventsGrid.style.width = '100%';
        eventsGrid.style.maxWidth = '100%';
        eventsGrid.style.overflow = 'visible';
    }
    
    eventCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.style.width = '100%';
        card.style.maxWidth = '100%';
        card.style.overflow = 'visible';
    });
    
    // Events are now visible
}

// Add event filtering functionality
function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            // You can add category logic here based on event types
            card.style.display = 'block';
        }
    });
}

// Add search functionality for events
function searchEvents(query) {
    const eventCards = document.querySelectorAll('.event-card');
    const searchTerm = query.toLowerCase();
    
    eventCards.forEach(card => {
        const eventName = card.querySelector('h3').textContent.toLowerCase();
        const eventDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (eventName.includes(searchTerm) || eventDesc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}



// Add window load event to ensure events are visible
window.addEventListener('load', () => {
    forceShowEvents();
    
    // Additional check after images and resources are loaded
    setTimeout(() => {
        forceShowEvents();
    }, 1000);
});

// Add mutation observer to watch for changes that might hide events
const eventsObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            // Check if events are hidden and force them visible
            const eventCards = document.querySelectorAll('.event-card');
            eventCards.forEach(card => {
                if (card.style.display === 'none' || 
                    card.style.visibility === 'hidden' || 
                    card.style.opacity === '0') {
                    card.style.display = 'block';
                    card.style.visibility = 'visible';
                    card.style.opacity = '1';
                }
            });
        }
    });
});

// Start observing the events section for changes
document.addEventListener('DOMContentLoaded', () => {
    const eventsSection = document.querySelector('#events');
    if (eventsSection) {
        eventsObserver.observe(eventsSection, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            subtree: true
        });
    }
    
    // Periodic check to ensure events stay visible
    setInterval(() => {
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const computedStyle = window.getComputedStyle(card);
            if (computedStyle.display === 'none' || 
                computedStyle.visibility === 'hidden' || 
                parseFloat(computedStyle.opacity) === 0) {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
            }
        });
    }, 2000); // Check every 2 seconds
});

// Add event reminder functionality
function setEventReminder(eventName, eventTime, eventDate) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(`Ganeshotsav 2025 - ${eventName}`, {
            body: `Your event ${eventName} is scheduled for ${eventTime} on ${eventDate}`,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
        });
    }
}

// Request notification permission
document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

// Add print functionality for schedule
function printSchedule() {
    window.print();
}

// Add share functionality
function shareEvent(eventName, eventTime, eventDate) {
    if (navigator.share) {
        navigator.share({
            title: `Ganeshotsav 2025 - ${eventName}`,
            text: `Join us for ${eventName} on ${eventDate} at ${eventTime}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Ganeshotsav 2025 - ${eventName} on ${eventDate} at ${eventTime}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Event details copied to clipboard!', 'success');
        });
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #8B4513;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollToTopBtn.addEventListener('click', scrollToTop);
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
});

// Add form validation hints
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(244, 67, 54)') {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
});

// Add event countdown for individual events
function addEventCountdown() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        // Find the date/time information in the event-details
        const dateElement = card.querySelector('.event-details span:first-child');
        
        if (dateElement && dateElement.textContent) {
            const eventDate = dateElement.textContent;
            if (eventDate.includes('Aug') || eventDate.includes('Sep')) {
                // Add countdown for upcoming events
                const countdownElement = document.createElement('div');
                countdownElement.className = 'event-countdown';
                countdownElement.style.cssText = `
                    margin-top: 1rem;
                    padding: 0.5rem;
                    background: #f9f9f9;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    color: #666;
                    text-align: center;
                `;
                
                // Calculate days until event (simple example)
                const today = new Date();
                const eventYear = 2025;
                let eventMonth, eventDay;
                
                if (eventDate.includes('Aug')) {
                    eventMonth = 7; // August is month 7 (0-indexed)
                    eventDay = parseInt(eventDate.match(/(\d+)/)[1]);
                } else if (eventDate.includes('Sep')) {
                    eventMonth = 8; // September is month 8 (0-indexed)
                    eventDay = parseInt(eventDate.match(/(\d+)/)[1]);
                }
                
                if (eventMonth !== undefined && eventDay) {
                    const eventDateObj = new Date(eventYear, eventMonth, eventDay);
                    const timeDiff = eventDateObj.getTime() - today.getTime();
                    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    
                    if (daysDiff > 0) {
                        countdownElement.textContent = `${daysDiff} days until event`;
                    } else if (daysDiff === 0) {
                        countdownElement.textContent = 'Event is today!';
                    } else {
                        countdownElement.textContent = 'Event completed';
                    }
                } else {
                    countdownElement.textContent = 'Event coming soon';
                }
                
                card.appendChild(countdownElement);
            }
        }
    });
}

// Initialize event countdown with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        addEventCountdown();
    } catch (error) {
        // Event countdown initialization skipped
    }
});

// Website loaded successfully

// Background Music Player - Hidden Player with Auto-play
function createBackgroundMusic() {
    // Create hidden audio element
    const backgroundMusic = document.createElement('audio');
    backgroundMusic.id = 'backgroundMusic';
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Set to 30% volume for background
    backgroundMusic.preload = 'auto';
    
    // Add audio sources
    backgroundMusic.innerHTML = `
        <source src="jai-ganesh-deva.mp3" type="audio/mpeg">
        <source src="jai-ganesh-deva.ogg" type="audio/ogg">
    `;
    
    // Add to page (hidden)
    document.body.appendChild(backgroundMusic);
    
    // Audio loading and error handling
    backgroundMusic.addEventListener('loadstart', function() {
        console.log('Loading Jai Ganesh Deva...');
    });
    
    backgroundMusic.addEventListener('canplay', function() {
        console.log('Jai Ganesh Deva ready to play');
        // Try to play automatically after user interaction
        document.addEventListener('click', function startMusic() {
            backgroundMusic.play().then(() => {
                console.log('Jai Ganesh Deva playing in background');
                showNotification('🎵 Jai Ganesh Deva playing in background', 'success');
            }).catch(e => {
                console.log('Auto-play prevented, user must interact first');
            });
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
    
    backgroundMusic.addEventListener('error', function() {
        console.log('Audio file not found. Please check the file path.');
        showNotification('Audio file not found. Please check the file path.', 'error');
    });
    
    // Auto-pause when page becomes hidden (mobile optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            backgroundMusic.pause();
        } else {
            // Resume when page becomes visible again
            if (backgroundMusic.readyState >= 2) { // HAVE_CURRENT_DATA
                backgroundMusic.play().catch(e => {
                    // Ignore play errors when resuming
                });
            }
        }
    });
    
    // Add keyboard shortcut for music control (hidden feature)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'm') { // Ctrl+M to toggle music
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(e => {
                    showNotification('🎵 Music resumed', 'success');
                });
            } else {
                backgroundMusic.pause();
                showNotification('🔇 Music paused', 'info');
            }
        }
    });
}

// Initialize background music when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundMusic();
}); 