

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
    
    // Events are now visible and properly laid out
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
// Note: Registration form was removed, so we only handle contact form
let contactForm = null;

// Wait for DOM to load before accessing forms
document.addEventListener('DOMContentLoaded', () => {
    contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
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
    }
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
    
    /* Event registration button styles */
    .event-registration {
        margin-top: 1rem;
        text-align: center;
    }
    
    .register-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #8B4513, #FFD700);
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        border: 2px solid transparent;
    }
    
    .register-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
        background: linear-gradient(135deg, #FFD700, #8B4513);
        color: #8B4513;
        border-color: #8B4513;
    }
    
    .register-btn i {
        font-size: 1rem;
    }
    
    /* Mobile responsive registration button */
    @media (max-width: 768px) {
        .register-btn {
            padding: 12px 24px;
            font-size: 1rem;
            width: 100%;
            justify-content: center;
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
// Registration form handling
// The registration form was removed, so this block is now effectively empty.

// Add hover effects for event cards
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.15)';
            this.style.borderLeftColor = '#8B4513';
            this.style.borderLeftWidth = '4px';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            this.style.borderLeftColor = '#e0e0e0';
            this.style.borderLeftWidth = '1px';
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

// Countdown timer for festival start
function updateCountdown() {
    const festivalStart = new Date('August 27, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = festivalStart - now;
    
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
        // Festival has started
        const countdownElement = document.querySelector('.countdown-timer');
        if (countdownElement) {
            countdownElement.innerHTML = '<div class="countdown-expired">🎉 Festival Started! 🎉</div>';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
});

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



// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeFAB();
    hidePastEvents(); // Hide events with passed dates
    
    // Set up daily check for past events
    setupDailyPastEventCheck();
    
    // Initialize mobile-specific features
    initializeMobileFeatures();
});

// Initialize mobile-specific features
function initializeMobileFeatures() {
    // Touch gesture handling
    initializeTouchGestures();
    
    // Pull to refresh functionality
    initializePullToRefresh();
    
    // Mobile-optimized scrolling
    initializeMobileScrolling();
    
    // Touch-friendly interactions
    initializeTouchInteractions();
    
    // Mobile performance optimizations
    initializeMobilePerformance();
    

}

// Floating Action Button (FAB) Functionality
function initializeFAB() {
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');
    
    if (fabButton && fabMenu) {
        fabButton.addEventListener('click', function() {
            fabMenu.classList.toggle('active');
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (fabMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!fabButton.contains(event.target) && !fabMenu.contains(event.target)) {
                fabMenu.classList.remove('active');
                const icon = fabButton.querySelector('i');
                icon.className = 'fas fa-plus';
            }
        });
    }
}

// Share website functionality
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Windows Society Ganeshotsav 2025',
            text: 'Join us for the grand celebration of Lord Ganesha from August 27 to September 6, 2025!',
            url: window.location.href
        }).then(() => {
            showNotification('Website shared successfully!', 'success');
        }).catch(() => {
            showNotification('Failed to share website', 'error');
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = 'Windows Society Ganeshotsav 2025 - Join us for the grand celebration!';
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            showNotification('Website link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy link', 'error');
        });
    }
}

// Dark mode toggle functionality
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        showNotification('Light mode enabled', 'success');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        showNotification('Dark mode enabled', 'success');
    }
}

// Check for saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
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
        // Handle escape key functionality
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

// Background music removed

// Music system removed 

// Function to hide events with passed dates
function hidePastEvents() {
    const eventCards = document.querySelectorAll('.event-card');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    let pastEventCount = 0;
    
    eventCards.forEach(card => {
        const dateElement = card.querySelector('.event-date');
        if (dateElement) {
            const dateText = dateElement.textContent;
            const eventDate = parseEventDate(dateText);
            
            if (eventDate && eventDate < today) {
                // Add past-event class for styling
                card.classList.add('past-event');
                
                // Add a "Past Event" indicator
                addPastEventIndicator(card);
                
                pastEventCount++;
                
                // Optionally hide the card completely (uncomment the next line if you want to hide past events)
                // card.style.display = 'none';
            }
        }
    });
    
    // Show notification about past events if there are any
    if (pastEventCount > 0) {
        showPastEventsNotification(pastEventCount);
    }
}

// Function to show notification about past events
function showPastEventsNotification(pastEventCount) {
    // Check if we've already shown this notification today
    const lastNotification = localStorage.getItem('lastPastEventNotification');
    const today = new Date().toDateString();
    
    if (lastNotification !== today) {
        const notification = document.createElement('div');
        notification.className = 'past-events-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${pastEventCount} event(s) have passed. Past events are marked with indicators.</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: #2196F3;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInLeft 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutLeft 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 10000);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Mark as shown today
        localStorage.setItem('lastPastEventNotification', today);
    }
}

 

// Function to set up daily check for past events
function setupDailyPastEventCheck() {
    // Check if we need to refresh past events (once per day)
    const lastCheck = localStorage.getItem('lastPastEventCheck');
    const today = new Date().toDateString();
    
    if (lastCheck !== today) {
        // Update past events
        hidePastEvents();
        localStorage.setItem('lastPastEventCheck', today);
    }
    
    // Set up interval to check every hour (in case user keeps page open)
    setInterval(() => {
        const currentDate = new Date().toDateString();
        if (currentDate !== lastCheck) {
            hidePastEvents();
            localStorage.setItem('lastPastEventCheck', currentDate);
        }
    }, 60 * 60 * 1000); // Check every hour
} 

// Touch gesture handling for mobile
function initializeTouchGestures() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isScrolling = false;
    
    // Touch start
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isScrolling = false;
    }, { passive: true });
    
    // Touch move
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        // Determine if user is scrolling or swiping
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            isScrolling = true;
        }
    }, { passive: true });
    
    // Touch end - handle gestures
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY || isScrolling) return;
        
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        const deltaTime = Date.now() - startTime;
        
        // Minimum swipe distance and maximum time
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        
        if (deltaTime < maxSwipeTime) {
            // Horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous section
                    handleSwipeRight();
                } else {
                    // Swipe left - go to next section
                    handleSwipeLeft();
                }
            }
            
            // Vertical swipe
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    // Swipe down - scroll to top
                    handleSwipeDown();
                } else {
                    // Swipe up - scroll to bottom
                    handleSwipeUp();
                }
            }
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        startTime = 0;
    }, { passive: true });
}

// Handle swipe right gesture
function handleSwipeRight() {
    const currentSection = getCurrentSection();
    const prevSection = getPreviousSection(currentSection);
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Previous section', 'info');
    }
}

// Handle swipe left gesture
function handleSwipeLeft() {
    const currentSection = getCurrentSection();
    const nextSection = getNextSection(currentSection);
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Next section', 'info');
    }
}

// Handle swipe down gesture
function handleSwipeDown() {
    scrollToTop();
    showNotification('Scrolled to top', 'info');
}

// Handle swipe up gesture
function handleSwipeUp() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
    showNotification('Scrolled to bottom', 'info');
}

// Get current visible section
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    return sections[0];
}

// Get previous section
function getPreviousSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
}

// Get next section
function getNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
}

// Pull to refresh functionality
function initializePullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    let isPulling = false;
    let refreshIndicator = null;
    
    // Create refresh indicator
    function createRefreshIndicator() {
        if (refreshIndicator) return refreshIndicator;
        
        refreshIndicator = document.createElement('div');
        refreshIndicator.className = 'pull-refresh-indicator';
        refreshIndicator.innerHTML = `
            <div class="refresh-content">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Pull to refresh</span>
            </div>
        `;
        refreshIndicator.style.cssText = `
            position: fixed;
            top: -60px;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #8B4513, #FFD700);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: top 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(refreshIndicator);
        return refreshIndicator;
    }
    
    // Touch start
    document.addEventListener('touchstart', function(e) {
        if (window.pageYOffset === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });
    
    // Touch move
    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 0 && window.pageYOffset === 0) {
            e.preventDefault();
            
            const indicator = createRefreshIndicator();
            const progress = Math.min(pullDistance / 100, 1);
            
            indicator.style.top = `${Math.min(pullDistance - 60, 0)}px`;
            
            if (pullDistance > 100) {
                indicator.querySelector('.refresh-content span').textContent = 'Release to refresh';
                indicator.querySelector('.refresh-content i').className = 'fas fa-arrow-down';
            } else {
                indicator.querySelector('.refresh-content span').textContent = 'Pull to refresh';
                indicator.querySelector('.refresh-content i').className = 'fas fa-arrow-down';
            }
        }
    }, { passive: false });
    
    // Touch end
    document.addEventListener('touchend', function(e) {
        if (!isPulling) return;
        
        if (pullDistance > 100) {
            // Trigger refresh
            const indicator = createRefreshIndicator();
            indicator.querySelector('.refresh-content span').textContent = 'Refreshing...';
            indicator.querySelector('.refresh-content i').className = 'fas fa-spinner fa-spin';
            
            // Simulate refresh (in real app, this would refresh data)
            setTimeout(() => {
                indicator.style.top = '-60px';
                
                // Refresh past events
                hidePastEvents();
                
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 300);
            }, 1500);
        } else {
            // Reset indicator
            const indicator = createRefreshIndicator();
            indicator.style.top = '-60px';
        }
        
        // Reset values
        isPulling = false;
        pullDistance = 0;
    }, { passive: true });
} 

// Mobile-optimized scrolling
function initializeMobileScrolling() {
    // Smooth scrolling for mobile
    let isScrolling = false;
    let scrollTimeout;
    
    // Optimize scroll performance
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
    
    // Add momentum scrolling for iOS
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Optimize scroll events for mobile
    let ticking = false;
    function updateScroll() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Touch-friendly interactions
function initializeTouchInteractions() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.event-card, .btn, .register-btn, .contact-item, .stat-item');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    // Long press functionality for context menus
    let longPressTimer;
    let longPressTarget;
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            longPressTarget = this;
            longPressTimer = setTimeout(() => {
                showContextMenu(this, e);
            }, 800);
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            clearTimeout(longPressTimer);
        }, { passive: true });
        
        element.addEventListener('touchmove', function() {
            clearTimeout(longPressTimer);
        }, { passive: true });
    });
}

// Show context menu on long press
function showContextMenu(element, event) {
    // Remove existing context menu
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create context menu
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    
    let menuItems = [];
    
    // Different menu items based on element type
    if (element.classList.contains('event-card')) {
        menuItems = [
            { icon: 'fas fa-share-alt', text: 'Share Event', action: () => shareEvent(element) },
            { icon: 'fas fa-calendar-plus', text: 'Add to Calendar', action: () => addToCalendar(element) },
            { icon: 'fas fa-bookmark', text: 'Bookmark', action: () => bookmarkEvent(element) }
        ];
    } else if (element.classList.contains('btn') || element.classList.contains('register-btn')) {
        menuItems = [
            { icon: 'fas fa-share-alt', text: 'Share', action: () => shareWebsite() },
            { icon: 'fas fa-copy', text: 'Copy Link', action: () => copyLink() }
        ];
    }
    
    contextMenu.innerHTML = menuItems.map(item => `
        <div class="context-menu-item" onclick="this.parentElement.remove(); ${item.action.toString().split('(')[0]}()">
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        </div>
    `).join('');
    
    // Position menu
    const rect = element.getBoundingClientRect();
    contextMenu.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 10}px;
        left: ${rect.left}px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        min-width: 200px;
        overflow: hidden;
    `;
    
    document.body.appendChild(contextMenu);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (contextMenu.parentNode) {
            contextMenu.remove();
        }
    }, 5000);
    
    // Remove on outside click
    document.addEventListener('click', function removeMenu() {
        if (contextMenu.parentNode) {
            contextMenu.remove();
        }
        document.removeEventListener('click', removeMenu);
    });
}

// Share event functionality
function shareEvent(element) {
    const eventTitle = element.querySelector('.event-title')?.textContent || 'Event';
    const eventDate = element.querySelector('.event-date')?.textContent || '';
    
    if (navigator.share) {
        navigator.share({
            title: `Ganeshotsav 2025 - ${eventTitle}`,
            text: `Join us for ${eventTitle} on ${eventDate}`,
            url: window.location.href
        });
    } else {
        const shareText = `Ganeshotsav 2025 - ${eventTitle} on ${eventDate}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Event details copied to clipboard!', 'success');
        });
    }
}

// Add to calendar functionality
function addToCalendar(element) {
    const eventTitle = element.querySelector('.event-title')?.textContent || 'Event';
    const eventDate = element.querySelector('.event-date')?.textContent || '';
    
    // Create calendar event URL (Google Calendar)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=20250827/20250906&details=${encodeURIComponent(`Join us for ${eventTitle} at Windows Society Ganeshotsav 2025`)}`;
    
    window.open(calendarUrl, '_blank');
    showNotification('Calendar event created!', 'success');
}

// Bookmark event functionality
function bookmarkEvent(element) {
    const eventTitle = element.querySelector('.event-title')?.textContent || 'Event';
    
    // Store in localStorage
    const bookmarks = JSON.parse(localStorage.getItem('eventBookmarks') || '[]');
    if (!bookmarks.includes(eventTitle)) {
        bookmarks.push(eventTitle);
        localStorage.setItem('eventBookmarks', JSON.stringify(bookmarks));
        showNotification('Event bookmarked!', 'success');
    } else {
        showNotification('Event already bookmarked!', 'info');
    }
}

// Copy link functionality
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    });
} 











// Mobile UX Enhancements

// Mobile-specific initialization
function initializeMobileUX() {
    // Add mobile-specific classes to body
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        
        // Initialize mobile-specific features
        initializeMobileNavigation();
        initializeMobileGestures();
        initializeMobilePerformance();
        initializeMobileAccessibility();
        initializeMobileForms();
        
        // Initialize modern mobile features
        initializeStaggeredAnimations();
        initializeModernInteractions();
        initializeSkeletonLoading();
        addHapticFeedback();
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle viewport changes
    window.addEventListener('resize', handleMobileResize);
}

// Enhanced mobile navigation
function initializeMobileNavigation() {
    // Smooth scroll to sections with mobile offset
    document.querySelectorAll('.bottom-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = window.innerWidth <= 768 ? 80 : 0;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mobile menu handling removed
            }
        });
    });
    
    // Add mobile navigation indicators
    addMobileNavigationIndicators();
    
    // Initialize mobile bottom navigation highlighting
    highlightCurrentSection();
}

// Add mobile navigation indicators
function addMobileNavigationIndicators() {
    // Create section indicators
    const sections = document.querySelectorAll('section[id]');
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    
    if (bottomNav && sections.length > 0) {
        sections.forEach(section => {
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';
            indicator.style.cssText = `
                position: absolute;
                top: -2px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 2px;
                background: #8B4513;
                transition: width 0.3s ease;
                border-radius: 1px;
            `;
            
            section.appendChild(indicator);
        });
    }
}

// Highlight current section in mobile navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
    
    if (sections.length === 0 || bottomNavLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Update bottom navigation
                bottomNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update section indicator
                const indicator = entry.target.querySelector('.section-indicator');
                if (indicator) {
                    indicator.style.width = '100%';
                }
            } else {
                // Reset section indicator
                const indicator = entry.target.querySelector('.section-indicator');
                if (indicator) {
                    indicator.style.width = '0';
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Enhanced mobile gestures
function initializeMobileGestures() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isScrolling = false;
    
    // Touch start
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isScrolling = false;
    }, { passive: true });
    
    // Touch move
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        // Determine if user is scrolling or swiping
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            isScrolling = true;
        }
    }, { passive: true });
    
    // Touch end - handle gestures
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY || isScrolling) return;
        
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        const deltaTime = Date.now() - startTime;
        
        // Minimum swipe distance and maximum time
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        
        if (deltaTime < maxSwipeTime) {
            // Horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous section
                    handleSwipeRight();
                } else {
                    // Swipe left - go to next section
                    handleSwipeLeft();
                }
            }
            
            // Vertical swipe
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    // Swipe down - scroll to top
                    handleSwipeDown();
                } else {
                    // Swipe up - scroll to bottom
                    handleSwipeUp();
                }
            }
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        startTime = 0;
    }, { passive: true });
}

// Mobile performance optimizations
function initializeMobilePerformance() {
    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 768) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--animation-timing', 'ease-out');
        
        // Pause animations when scrolling for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 100);
        }, { passive: true });
    }
    
    // Lazy load images on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Mobile accessibility improvements
function initializeMobileAccessibility() {
    // Add ARIA labels for mobile
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        const title = card.querySelector('.event-title')?.textContent || 'Event';
        card.setAttribute('aria-label', `${title} - Tap for details`);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add skip links for mobile
    addSkipLinks();
    
    // Improve focus management
    improveFocusManagement();
}

// Add skip links for accessibility
function addSkipLinks() {
    const skipLinks = [
        { href: '#home', text: 'Skip to main content' },
        { href: '#events', text: 'Skip to events' },
        { href: '#contact', text: 'Skip to contact' }
    ];
    
    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links';
    skipContainer.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 1001;
    `;
    
    skipLinks.forEach(link => {
        const skipLink = document.createElement('a');
        skipLink.href = link.href;
        skipLink.textContent = link.text;
        skipLink.style.cssText = `
            background: #8B4513;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.9rem;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        skipContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipContainer, document.body.firstChild);
}

// Improve focus management
function improveFocusManagement() {

}

// Enhanced mobile forms
function initializeMobileForms() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Prevent zoom on iOS
        if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
            input.style.fontSize = '16px';
        }
        
        // Add mobile-friendly focus styles
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            
            // Scroll input into view on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            }
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Add mobile-specific validation
        input.addEventListener('input', function() {
            validateMobileInput(this);
        });
    });
    
    // Enhance form submission for mobile
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Validate mobile input
function validateMobileInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let message = '';
    
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'tel':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            isValid = phoneRegex.test(value);
            message = isValid ? '' : 'Please enter a valid phone number';
            break;
        case 'text':
            isValid = value.length >= 2;
            message = isValid ? '' : 'Please enter at least 2 characters';
            break;
    }
    
    // Show/hide validation message
    let validationMsg = input.parentElement.querySelector('.validation-message');
    if (!validationMsg && !isValid) {
        validationMsg = document.createElement('div');
        validationMsg.className = 'validation-message';
        validationMsg.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        `;
        validationMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
        input.parentElement.appendChild(validationMsg);
    } else if (validationMsg && isValid) {
        validationMsg.remove();
    } else if (validationMsg && !isValid) {
        validationMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    }
    
    // Update input styling
    input.style.borderColor = isValid ? '#4CAF50' : '#f44336';
    input.style.backgroundColor = isValid ? 'white' : '#fff5f5';
}

// Handle orientation changes
function handleOrientationChange() {
    setTimeout(() => {
        // Recalculate mobile-specific dimensions
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            initializeMobileUX();
        } else {
            document.body.classList.remove('mobile-device');
        }
    }, 100);
}

// Handle mobile resize
function handleMobileResize() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}

// Initialize mobile UX when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileUX();
});

// Add mobile-specific event listeners
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        // Add mobile-specific features after page load
        addMobileEnhancements();
    }
});

// Add mobile enhancements
function addMobileEnhancements() {
    // Add pull-to-refresh functionality
    addPullToRefresh();
    
    // Add mobile gesture hints
    addMobileGestureHints();
    
    // Add mobile performance monitoring
    addMobilePerformanceMonitoring();
}

// Add pull-to-refresh functionality
function addPullToRefresh() {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    let isPulling = false;
    let refreshIndicator = null;
    
    // Create refresh indicator
    function createRefreshIndicator() {
        if (refreshIndicator) return refreshIndicator;
        
        refreshIndicator = document.createElement('div');
        refreshIndicator.className = 'pull-refresh-indicator';
        refreshIndicator.innerHTML = `
            <div class="refresh-content">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Pull to refresh</span>
            </div>
        `;
        refreshIndicator.style.cssText = `
            position: fixed;
            top: -60px;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #8B4513, #FFD700);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: top 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(refreshIndicator);
        return refreshIndicator;
    }
    
    // Touch start
    document.addEventListener('touchstart', function(e) {
        if (window.pageYOffset === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });
    
    // Touch move
    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 0 && window.pageYOffset === 0) {
            e.preventDefault();
            
            const indicator = createRefreshIndicator();
            const progress = Math.min(pullDistance / 100, 1);
            
            indicator.style.top = `${Math.min(pullDistance - 60, 0)}px`;
            
            if (pullDistance > 100) {
                indicator.querySelector('.refresh-content span').textContent = 'Release to refresh';
                indicator.querySelector('.refresh-content i').className = 'fas fa-arrow-down';
            } else {
                indicator.querySelector('.refresh-content span').textContent = 'Pull to refresh';
                indicator.querySelector('.refresh-content i').className = 'fas fa-arrow-down';
            }
        }
    }, { passive: false });
    
    // Touch end
    document.addEventListener('touchend', function(e) {
        if (!isPulling) return;
        
        if (pullDistance > 100) {
            // Trigger refresh
            const indicator = createRefreshIndicator();
            indicator.querySelector('.refresh-content span').textContent = 'Refreshing...';
            indicator.querySelector('.refresh-content i').className = 'fas fa-spinner fa-spin';
            
            // Simulate refresh
            setTimeout(() => {
                indicator.style.top = '-60px';
                
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 300);
            }, 1500);
        } else {
            // Reset indicator
            const indicator = createRefreshIndicator();
            indicator.style.top = '-60px';
        }
        
        // Reset values
        isPulling = false;
        pullDistance = 0;
    }, { passive: true });
}

// Add mobile gesture hints
function addMobileGestureHints() {
    // Only show on first visit
    if (localStorage.getItem('mobileGestureHintsShown')) return;
    
    setTimeout(() => {
        const hint = document.createElement('div');
        hint.className = 'mobile-gesture-hint';
        hint.innerHTML = `
            <div class="hint-content">
                <i class="fas fa-hand-pointer"></i>
                <span>Swipe left/right to navigate sections • Pull down to refresh</span>
                <button class="hint-close">&times;</button>
            </div>
        `;
        
        hint.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 20px;
            right: 20px;
            background: rgba(139, 69, 19, 0.95);
            color: white;
            padding: 1rem;
            border-radius: 15px;
            z-index: 10000;
            animation: slideUpIn 0.5s ease;
        `;
        
        document.body.appendChild(hint);
        
        // Close button functionality
        const closeBtn = hint.querySelector('.hint-close');
        closeBtn.addEventListener('click', () => {
            hint.remove();
            localStorage.setItem('mobileGestureHintsShown', 'true');
        });
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (hint.parentNode) {
                hint.style.animation = 'slideUpOut 0.5s ease';
                setTimeout(() => hint.remove(), 500);
                localStorage.setItem('mobileGestureHintsShown', 'true');
            }
        }, 8000);
    }, 2000);
}

// Add mobile performance monitoring
function addMobilePerformanceMonitoring() {
    // Monitor scroll performance
    let scrollCount = 0;
    let lastScrollTime = Date.now();
    
    window.addEventListener('scroll', () => {
        scrollCount++;
        const now = Date.now();
        
        if (now - lastScrollTime > 1000) {
            // If scrolling is too frequent, reduce animations
            if (scrollCount > 50) {
                document.body.classList.add('reduce-animations');
            }
            scrollCount = 0;
            lastScrollTime = now;
        }
    }, { passive: true });
    
    // Monitor touch performance
    let touchCount = 0;
    let lastTouchTime = Date.now();
    
    document.addEventListener('touchstart', () => {
        touchCount++;
        const now = Date.now();
        
        if (now - lastTouchTime > 1000) {
            if (touchCount > 30) {
                document.body.classList.add('reduce-animations');
            }
            touchCount = 0;
            lastTouchTime = now;
        }
    }, { passive: true });
} 

// ===== MODERN MOBILE FEATURES =====

// Initialize staggered animations for event cards
function initializeStaggeredAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    // Create intersection observer for staggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation based on index
                setTimeout(() => {
                    entry.target.style.animation = `cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(40px) scale(0.95)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    eventCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize modern interactions (ripple effects, micro-animations)
function initializeModernInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .register-btn, .fab-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
        button.addEventListener('touchstart', createRippleEffect);
    });
    
    // Add icon bounce effects
    const icons = document.querySelectorAll('.fas, .far, .fab');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.style.animation = 'iconBounce 0.6s ease';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: buttonRipple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}



// Initialize skeleton loading
function initializeSkeletonLoading() {
    // Show skeleton loading initially
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        // Create skeleton version
        const skeleton = card.cloneNode(true);
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-button"></div>
        `;
        
        // Replace with skeleton temporarily
        card.style.display = 'none';
        card.parentNode.insertBefore(skeleton, card);
        
        // Show actual content after delay
        setTimeout(() => {
            skeleton.remove();
            card.style.display = 'flex';
            card.style.animation = `cardFadeIn 0.8s ease forwards`;
        }, 500 + (index * 200));
    });
}

// Add haptic feedback for mobile devices
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        const interactiveElements = document.querySelectorAll('.btn, .register-btn, .fab-button, .event-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                navigator.vibrate(10);
            });
        });
    }
}

 