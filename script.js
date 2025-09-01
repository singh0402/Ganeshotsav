// Modern JavaScript for Windows Society Ganeshotsav 2025
// Enhanced with smooth animations and modern interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Windows Society Ganeshotsav 2025 - Modern Website Loaded!');
    
    // Initialize all components
    initializeAnimations();
    initializeSmoothScrolling();
    initializeEventRemoval();
    initializeMobileOptimizations();
});

// Modern Animation System
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.event-card, .stat-item, .winner-category');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .date-section, .about-content');
    fadeElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.observe(el);
    });
    
    // Add hover effects to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Smooth Scrolling with modern easing
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state to navigation
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Event Removal System
function initializeEventRemoval() {
    function removePastEvents() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // 0-11 (January = 0)
        const currentDay = today.getDate();
        
        console.log(`🔍 Checking for past events on ${currentDay}/${currentMonth + 1}/${currentYear}`);
        
        const eventCards = document.querySelectorAll('.event-card');
        console.log(`📅 Found ${eventCards.length} event cards to check`);
        
        // Ensure all event cards are visible first
        eventCards.forEach(card => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.display = 'block';
        });
        
        eventCards.forEach((card, index) => {
            const dateSection = card.closest('.date-section');
            if (!dateSection) return;
            
            const dateTitle = dateSection.querySelector('.date-title');
            if (!dateTitle) return;
            
            const dateText = dateTitle.textContent;
            console.log(`📋 Checking event ${index + 1}: ${dateText}`);
            
            // Parse the date from the title (e.g., "August 30, 2025" or "September 1, 2025")
            const dateMatch = dateText.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/);
            if (!dateMatch) {
                console.log(`❌ Could not parse date: ${dateText}`);
                return;
            }
            
            const monthName = dateMatch[1];
            const day = parseInt(dateMatch[2]);
            const year = parseInt(dateMatch[3]);
            
            // Convert month name to number
            const months = {
                'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
                'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
            };
            
            const month = months[monthName];
            if (month === undefined) {
                console.log(`❌ Unknown month: ${monthName}`);
                return;
            }
            
            // Create event date
            const eventDate = new Date(year, month, day);
            
            // Compare dates
            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            console.log(`📅 Event date: ${eventDate.toDateString()}, Today: ${todayDate.toDateString()}`);
            
            // Return true if event date is before today
            if (eventDate < todayDate) {
                console.log(`🗑️ Removing past event: ${dateText}`);
                
                // Add fade-out animation before removing
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.remove();
                    console.log('✅ Removed past event card');
                    
                    // Check if the date section is now empty and remove it
                    const remainingCards = dateSection.querySelectorAll('.event-card');
                    if (remainingCards.length === 0) {
                        console.log('🗑️ Removing empty date section');
                        dateSection.style.transition = 'all 0.5s ease';
                        dateSection.style.opacity = '0';
                        dateSection.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            dateSection.remove();
                            console.log('✅ Removed empty date section');
                        }, 500);
                    }
                }, 500);
            } else {
                console.log(`✅ Event is current or future: ${dateText}`);
                // Ensure current/future events are visible
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.display = 'block';
            }
        });
    }
    
    // Check for past events every hour and on page load
    setInterval(removePastEvents, 3600000); // Every hour
    removePastEvents(); // Initial check
    
    // Also check when the page becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            removePastEvents();
        }
    });
    
    // Force check after a short delay to ensure DOM is ready
    setTimeout(removePastEvents, 1000);
    
    // Manual function to force remove August 30 events (for testing)
    window.forceRemoveAugust30 = function() {
        console.log('🔧 Manually removing August 30 events...');
        const august30Section = document.querySelector('.date-section');
        if (august30Section) {
            const dateTitle = august30Section.querySelector('.date-title');
            if (dateTitle && dateTitle.textContent.includes('August 30')) {
                console.log('🗑️ Found August 30 section, removing...');
                august30Section.style.transition = 'all 0.5s ease';
                august30Section.style.opacity = '0';
                august30Section.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    august30Section.remove();
                    console.log('✅ August 30 section removed!');
                }, 500);
            }
        }
    };
    
    // Auto-remove August 30 if we're past that date
    const today = new Date();
    const august30 = new Date(2025, 7, 30); // August 30, 2025 (month is 0-indexed)
    if (today > august30) {
        console.log('📅 Past August 30, auto-removing...');
        setTimeout(() => {
            window.forceRemoveAugust30();
        }, 2000);
    }
    
    // Ensure events are visible on mobile
    window.ensureEventsVisible = function() {
        console.log('📱 Ensuring events are visible on mobile...');
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.display = 'block';
        });
        
        const dateSections = document.querySelectorAll('.date-section');
        dateSections.forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.display = 'block';
        });
    };
    
    // Call this function on mobile devices
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            window.ensureEventsVisible();
        }, 500);
    }
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Touch-friendly interactions
    const touchElements = document.querySelectorAll('.event-card, .register-btn, .contact-persons a');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Optimize for mobile performance
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });
    }
    
    // Add mobile-specific styles
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
        
        // Optimize touch targets
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
        });
    }
}

// Enhanced Console Logging
console.log('🚀 Windows Society Ganeshotsav 2025 - Modern Website Initialized!');
console.log('📱 Mobile Optimized: ' + (window.innerWidth <= 768));
console.log('🎨 Modern Design: infinitepig.com inspired');
console.log('⚡ Performance: Optimized for speed and user experience');

// Error Handling
window.addEventListener('error', function(e) {
    console.error('❌ Website Error:', e.error);
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log('⏱️ Page Load Time:', Math.round(loadTime), 'ms');
    
    if (loadTime > 3000) {
        console.warn('⚠️ Slow page load detected. Consider optimizing images and scripts.');
    }
});











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
    
    // Improve focus management
    improveFocusManagement();
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

 