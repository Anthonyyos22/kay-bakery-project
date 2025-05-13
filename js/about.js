// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Section Reveal Animation
const sections = document.querySelectorAll('section');
const revealSection = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
revealSection(); // Run on page load

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Stats Counter Animation
const counters = document.querySelectorAll('.stat-number');
let statsStarted = false;

const runCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace(',', '');
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
};

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (!statsStarted && sectionTop < window.innerHeight * 0.8) {
        runCounters();
        statsStarted = true;
    }
});

// Swiper Initialization for Team and Testimonial Sliders
const teamSwiper = new Swiper('.team-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Newsletter Form Validation
const newsletterForm = document.querySelector('#newsletter-form');
const formMessage = document.querySelector('.form-message');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        formMessage.textContent = 'Please enter an email address.';
        formMessage.style.color = 'var(--warning)';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'var(--warning)';
    } else {
        formMessage.textContent = 'Thank you for subscribing!';
        formMessage.style.color = 'var(--success)';
        emailInput.value = '';
        // Simulate API call or further processing
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000);
    }
});

// Gallery Item Click Handler (Placeholder for future functionality)
document.querySelectorAll('.gallery-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.previousElementSibling.textContent;
        console.log(`View more clicked for category: ${category}`);
        // Add functionality like redirecting to a catalog page or opening a modal
    });
});