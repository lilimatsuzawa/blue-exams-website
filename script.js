// Blue Exams - Website JavaScript

// Handle Start Practice button
function handleStartPractice() {
    // Scroll to features section first
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show engagement message after scroll
    setTimeout(() => {
        showNotification('Explore our features below, then get started!', 'info');
    }, 800);
    
    // Track event
    trackEvent('click', 'header_cta', 'Start Your Practice');
}

// Handle Get Started button
function handleGetStarted() {
    // Show pricing/signup modal or redirect
    showNotification('Thank you for your interest! Payment integration coming soon.\n\nFor early access, contact us at contact@blueexams.com', 'success');
    
    // Track conversion event
    trackEvent('click', 'main_cta', 'Get Started Now');
    
    // Optional: Add some visual feedback
    const button = event.target.closest('.btn-cta');
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Thank You!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 3000);
    }
}

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
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </div>
            <div class="notification-message">${message.replace(/\n/g, '<br>')}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Analytics tracking (placeholder)
function trackEvent(action, category, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }
    
    // Console log for development
    console.log(`Event tracked: ${action} | ${category} | ${label}`);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add animation classes when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat-item, .benefit-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => notification.remove());
        }
        
        // Enter key on focused buttons
        if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
            document.activeElement.click();
        }
    });
    
    // Add tooltips to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const card = this.closest('.feature-card');
            const title = card.querySelector('.feature-title').textContent;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                background: #1a1a1a;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
});

// Add CSS animations
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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
    }
    
    .notification-icon {
        font-size: 1.25rem;
        margin-top: 2px;
    }
    
    .notification-message {
        flex: 1;
        line-height: 1.5;
        color: #374151;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .notification-success .notification-icon {
        color: #10b981;
    }
    
    .notification-error .notification-icon {
        color: #ef4444;
    }
    
    .notification-info .notification-icon {
        color: #3b82f6;
    }
`;
document.head.appendChild(style);

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Preload critical resources
        const criticalImages = ['logo.svg'];
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
