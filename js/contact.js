// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const response = document.getElementById('formResponse');
    response.textContent = "Message sent successfully! We’ll get back to you.";
    response.style.color = "green";
    response.style.background = "#d4edda";
    response.style.border = "1px solid #c3e6cb";
    response.style.padding = "10px";
    this.reset();
});
