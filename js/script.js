document.addEventListener("DOMContentLoaded", function() {

    // 1. Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon from hamburger to close (X)
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-list a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // 2. Navbar Scroll Effect (Glassmorphism solidifies slightly on scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the item enters completely
        threshold: 0.15 // 15% completely visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Once visible, stop observing
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));


    // 4. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const answer = currentItem.querySelector('.faq-answer');
            const isActive = currentItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current FAQ
            if (!isActive) {
                currentItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 5. Mobile Center-Screen Hover Effect
    const hoverableElements = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .btn-outline, .nav-list a, .stat-item, .feature-card, .board-badge, .btn, .classroom-card, .testimonial-card, .faq-item, .faq-question, .social-links a, .footer-links a, .whatsapp-float'
    );
    
    // Target the absolute middle 10% of the viewport to prevent multiple simultaneous hovers
    const centerObserverOptions = {
        root: null,
        rootMargin: '-45% 0px -45% 0px', 
        threshold: 0
    };

    const centerObserver = new IntersectionObserver((entries) => {
        if (window.innerWidth <= 767) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-hover');
                } else {
                    entry.target.classList.remove('mobile-hover');
                }
            });
        }
    }, centerObserverOptions);

    hoverableElements.forEach(el => centerObserver.observe(el));

    // Cleanup hover states if window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            document.querySelectorAll('.mobile-hover').forEach(el => el.classList.remove('mobile-hover'));
        }
    });

});
