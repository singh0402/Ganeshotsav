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
    
    // Debug: Ensure events are visible
    const eventsSection = document.querySelector('.events');
    const eventsGrid = document.querySelector('.events-grid');
    const eventCards = document.querySelectorAll('.event-card');
    
    console.log('Events Section:', eventsSection);
    console.log('Events Grid:', eventsGrid);
    console.log('Event Cards Count:', eventCards.length);
    
    // Force visibility on mobile
    if (window.innerWidth <= 768) {
        eventCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
        
        if (eventsGrid) {
            eventsGrid.style.display = 'grid';
            eventsGrid.style.gridTemplateColumns = '1fr';
        }
    }
});

// Handle window resize for mobile responsiveness
window.addEventListener('resize', () => {
    const eventCards = document.querySelectorAll('.event-card');
    const eventsGrid = document.querySelector('.events-grid');
    
    if (window.innerWidth <= 768) {
        eventCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
        
        if (eventsGrid) {
            eventsGrid.style.display = 'grid';
            eventsGrid.style.gridTemplateColumns = '1fr';
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
    
    // Log registration data (in real app, this would be sent to server)
    console.log('Registration Data:', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        events: selectedEvents,
        message: data.message
    });
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
    
    // Log contact data (in real app, this would be sent to server)
    console.log('Contact Data:', {
        name: data.contactName,
        email: data.contactEmail,
        subject: data.contactSubject,
        message: data.contactMessage
    });
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

// Add CSS animations for notifications
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
        const eventDate = card.querySelector('.event-details .time').textContent;
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
            
            card.appendChild(countdownElement);
        }
    });
}

// Initialize event countdown
document.addEventListener('DOMContentLoaded', addEventCountdown);

console.log('Windows Society Ganeshotsav 2025 website loaded successfully! 🎉');
console.log('Festival Dates: August 27 - September 6, 2025');
console.log('Total Events: 25+ activities and competitions'); 