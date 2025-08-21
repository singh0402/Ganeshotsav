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

// Enhanced Event Filtering System with past event handling
function initializeEventFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dateSections = document.querySelectorAll('.date-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedDate = this.getAttribute('data-date');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter date sections
            dateSections.forEach(section => {
                if (selectedDate === 'all') {
                    // Show all sections, but past events remain hidden
                    section.style.display = 'block';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                } else {
                    const sectionDate = getSectionDate(section);
                    if (sectionDate === selectedDate) {
                        section.style.display = 'block';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    } else {
                        section.style.display = 'none';
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(20px)';
                    }
                }
            });
            
            // Smooth scroll to events section
            const eventsSection = document.querySelector('#events');
            if (eventsSection) {
                eventsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// Helper function to get date from section
function getSectionDate(section) {
    const dateTitle = section.querySelector('.date-title');
    if (dateTitle) {
        const dateText = dateTitle.textContent.toLowerCase();
        if (dateText.includes('august 27')) return 'aug27';
        if (dateText.includes('august 28')) return 'aug28';
        if (dateText.includes('august 29')) return 'aug29';
        if (dateText.includes('august 30')) return 'aug30';
        if (dateText.includes('august 31')) return 'aug31';
        if (dateText.includes('september 1')) return 'sep1';
        if (dateText.includes('september 2')) return 'sep2';
        if (dateText.includes('september 3')) return 'sep3';
        if (dateText.includes('september 4')) return 'sep4';
        if (dateText.includes('september 5')) return 'sep5';
        if (dateText.includes('september 6')) return 'sep6';
    }
    return '';
}

// Initialize event filter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeEventFilter();
    initializeFAB();
    hidePastEvents(); // Hide events with passed dates
    
    // Set up daily check for past events
    setupDailyPastEventCheck();
});

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
    
    // Update the filter to show/hide past events
    updateFilterButtonsForPastEvents();
    
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
                <span>${pastEventCount} event(s) have passed. Use the "Past Events" filter to view them.</span>
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

// Function to update filter buttons to show past events option
function updateFilterButtonsForPastEvents() {
    const filterButtons = document.querySelector('.filter-buttons');
    const pastEventsButton = document.querySelector('.filter-btn[data-date="past"]');
    
    // Only add past events button if it doesn't exist
    if (!pastEventsButton) {
        const pastButton = document.createElement('button');
        pastButton.className = 'filter-btn';
        pastButton.setAttribute('data-date', 'past');
        pastButton.innerHTML = `
            <i class="fas fa-history"></i>
            <span>Past Events</span>
        `;
        
        // Insert before the last button (or wherever you prefer)
        filterButtons.appendChild(pastButton);
        
        // Add event listener for the new button
        pastButton.addEventListener('click', function() {
            showPastEvents();
        });
    }
}

// Function to show past events
function showPastEvents() {
    const eventCards = document.querySelectorAll('.event-card');
    const dateSections = document.querySelectorAll('.date-section');
    
    // Show all sections
    dateSections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
    
    // Show only past events
    eventCards.forEach(card => {
        if (card.classList.contains('past-event')) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-date="past"]').classList.add('active');
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