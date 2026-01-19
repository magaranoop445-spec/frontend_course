// Main JavaScript for NEON Premium Shopping

// DOM Elements
const preloader = document.querySelector('.preloader');
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.querySelector('.btn-load-more');
const cartCount = document.querySelector('.cart-count');
const wishlistCount = document.querySelector('.wishlist-count');

// Sample Products Data with WORKING image URLs
const products = [
    {
        id: 1,
        name: 'Premium Leather Shoes',
        category: 'fashion',
        price: 4500,
        originalPrice: 6000,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.5,
        description: 'Handcrafted premium leather shoes with comfortable cushioning.'
    },
    {
        id: 2,
        name: 'Smart Watch Pro',
        category: 'electronics',
        price: 12000,
        originalPrice: 15000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        description: 'Advanced smartwatch with health monitoring and GPS.'
    },
    {
        id: 4,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 8000,
        originalPrice: 10000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.4,
        description: 'Noise-cancelling wireless headphones with premium sound.'
    },
    {
        id: 5,
        name: 'Designer Kurta Set',
        category: 'fashion',
        price: 3500,
        originalPrice: 5000,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        description: 'Traditional Nepali kurta set with modern design.'
    },
    {
        id: 6,
        name: 'Copper Water Pot',
        category: 'home',
        price: 1800,
        originalPrice: 2500,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.3,
        description: 'Traditional copper water pot with health benefits.'
    },
    {
        id: 7,
        name: 'Smartphone X',
        category: 'electronics',
        price: 45000,
        originalPrice: 55000,
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        description: 'Latest smartphone with premium camera and performance.'
    },
    {
        id: 8,
        name: 'Wooden Carved Statue',
        category: 'crafts',
        price: 6500,
        originalPrice: 8000,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        description: 'Hand-carved wooden statue by Nepali artisans.'
    },
    {
        id: 9,
        name: 'Handwoven Silk Sari',
        category: 'fashion',
        price: 8500,
        originalPrice: 12000,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        description: 'Premium handwoven silk sari with traditional motifs.'
    },
    {
        id: 10,
        name: 'Nepali Tea Set',
        category: 'home',
        price: 3200,
        originalPrice: 4500,
        image: 'https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        description: 'Ceramic tea set with Nepali traditional design.'
    },
    {
        id: 11,
        name: 'Traditional Nepali Dhaka Topi',
        category: 'crafts',
        price: 1500,
        originalPrice: 2200,
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        description: 'Authentic Nepali Dhaka topi with traditional patterns.'
    },
   
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('neon-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('neon-wishlist')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Remove preloader
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // Load products
    loadProducts();
    updateCartCount();
    updateWishlistCount();

    // Initialize AOS
    initAOS();

    // Setup event listeners
    setupEventListeners();

    // Countdown timer
    startCountdown();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('neon-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Initialize AOS-like animations
function initAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Cart toggle
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            const filter = button.dataset.filter;
            loadProducts(filter);
        });
    });

    // Load more products
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Payment method selection
    document.querySelectorAll('.payment-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.payment-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');
        });
    });
    
    // Fix for product showcase animations
    setupProductShowcase();
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('neon-theme', newTheme);
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Handle scroll
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// Load products
function loadProducts(filter = 'all') {
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }

    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
            <button class="product-quick-view" title="Quick View">
                <i class="fas fa-eye"></i>
            </button>
        </div>
        <div class="product-content">
            <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                ${generateStarRating(product.rating)}
                <span>(${product.rating})</span>
            </div>
            <div class="product-price">
                <span class="current-price">रु ${product.price.toLocaleString()}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">रु ${product.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="product-btn add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="product-btn buy-now" data-id="${product.id}">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    const quickViewBtn = card.querySelector('.product-quick-view');
    const addToCartBtn = card.querySelector('.add-to-cart');
    const buyNowBtn = card.querySelector('.buy-now');

    quickViewBtn.addEventListener('click', () => showQuickView(product));
    addToCartBtn.addEventListener('click', () => addToCart(product.id));
    buyNowBtn.addEventListener('click', () => buyNow(product.id));

    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Load more products
function loadMoreProducts() {
    // In a real app, this would load more products from an API
    const loadMoreBtn = document.querySelector('.btn-load-more');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate loading more products
        showNotification('More products loaded!', 'success');
        loadMoreBtn.innerHTML = '<span>Load More Products</span><i class="fas fa-chevron-down"></i>';
        loadMoreBtn.disabled = false;
    }, 1500);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Update cart
function updateCart() {
    localStorage.setItem('neon-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartSidebar();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart sidebar
function updateCartSidebar() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const subtotalEl = document.querySelector('.subtotal');
    const totalEl = document.querySelector('.total-amount');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmpty.style.display = 'block';
        subtotalEl.textContent = 'रु 0.00';
        totalEl.textContent = 'रु 0.00';
        return;
    }

    cartEmpty.style.display = 'none';
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">रु ${item.price.toLocaleString()}</p>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to quantity buttons
    cartItemsContainer.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, -1);
        });
    });

    cartItemsContainer.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, 1);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('button').dataset.id);
            removeFromCart(productId);
        });
    });

    const shipping = 100;
    const total = subtotal + shipping;

    subtotalEl.textContent = `रु ${subtotal.toLocaleString()}`;
    totalEl.textContent = `रु ${total.toLocaleString()}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const product = cart[itemIndex];
        cart.splice(itemIndex, 1);
        updateCart();
        showNotification(`${product.name} removed from cart`, 'info');
    }
}

// Open cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Buy now
function buyNow(productId) {
    addToCart(productId);
    openCart();
}

// Show quick view
function showQuickView(product) {
    const quickViewModal = document.querySelector('.quick-view-modal');
    const quickViewBody = document.getElementById('quick-view-body');
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    quickViewBody.innerHTML = `
        <div class="quick-view-content">
            <div class="product-details">
                <div class="product-images">
                    <img src="${product.image}" alt="${product.name}" class="main-image">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span>${product.rating} (124 reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">रु ${product.price.toLocaleString()}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">रु ${product.originalPrice.toLocaleString()}</span>
                             <span class="discount-badge">-${discount}%</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-features">
                        <div class="feature">
                            <i class="fas fa-shipping-fast"></i>
                            <span>Free Delivery across Nepal</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-undo"></i>
                            <span>7 Days Return Policy</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-shield-alt"></i>
                            <span>100% Authentic Products</span>
                        </div>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <label>Quantity:</label>
                            <div class="quantity-control">
                                <button class="quantity-btn decrease-qv">-</button>
                                <input type="number" value="1" min="1" class="quantity-input" id="qv-quantity">
                                <button class="quantity-btn increase-qv">+</button>
                            </div>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-primary add-to-cart-qv" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn buy-now-qv" data-id="${product.id}">
                                <i class="fas fa-bolt"></i> Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for quick view
    const addToCartBtn = quickViewBody.querySelector('.add-to-cart-qv');
    const buyNowBtn = quickViewBody.querySelector('.buy-now-qv');
    const closeBtn = document.querySelector('.close-quick-view');
    const modalOverlay = quickViewModal.querySelector('.modal-overlay');
    const decreaseBtn = quickViewBody.querySelector('.decrease-qv');
    const increaseBtn = quickViewBody.querySelector('.increase-qv');
    const quantityInput = quickViewBody.querySelector('#qv-quantity');
    
    // Quantity controls
    decreaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        closeQuickView();
    });
    
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        closeQuickView();
        openCart();
    });
    
    closeBtn.addEventListener('click', closeQuickView);
    modalOverlay.addEventListener('click', closeQuickView);
}

// Close quick view
function closeQuickView() {
    const quickViewModal = document.querySelector('.quick-view-modal');
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Update wishlist count
function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        loadProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Handle newsletter submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real app, you would send this to your backend
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Start countdown timer
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set countdown to 3 days from now
    const countDownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Setup product showcase animations
function setupProductShowcase() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.5}s`);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#00CC88' : 
                         type === 'error' ? '#FF6B6B' : '#0066FF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Add close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(8px, -8px);
    }
    
    .discount-badge {
        display: inline-block;
        background-color: var(--color-accent);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 0.5rem;
    }
`;
document.head.appendChild(style);

