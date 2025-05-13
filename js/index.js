document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#featured').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
    
    // Cart functionality
    const cart = [];
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceElement = document.querySelector('.total-price');
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.featured-item');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('₦', '').replace(',', ''));
            const itemImage = item.querySelector('img').src;
            
            addToCart({
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            });
        });
    });
    
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }
        
        updateCart();
        showCartNotification(item.name);
    }
    
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart sidebar
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-controls">
                        <button class="decrease-quantity">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                        <span class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                </div>
                <button class="remove-item">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        totalPriceElement.textContent = `₦${totalPrice.toLocaleString()}`;
    }
    
    function showCartNotification(itemName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>${itemName} added to cart!</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Toggle cart sidebar
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('open');
    });
    
    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            // Here you would typically send the email to your server
            alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
            this.reset();
        });
    }
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });
});