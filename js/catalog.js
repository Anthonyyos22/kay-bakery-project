// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const priceRows = document.querySelectorAll('.price-table tbody tr');
    const copyright = document.querySelector('.copyright p');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header effect with animation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Price table row animation (fade-in on scroll)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    priceRows.forEach(row => {
        observer.observe(row);
    });

    // Back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navigation link hover effect
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    copyright.textContent = `© ${currentYear} Nzisa Sweetmart. All rights reserved.`;
});