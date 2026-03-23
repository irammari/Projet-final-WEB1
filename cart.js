// État global du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <p>${item.name}</p>
                    <small>x${item.quantity}</small>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button onclick="removeFromCart('${item.id}')">✕</button>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total-price').textContent = '$' + total.toFixed(2);
}

function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

// Appelée depuis courses.html sur chaque cours
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Events
document.getElementById('cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

updateCartCount();