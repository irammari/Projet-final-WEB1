let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItems() {
    if (!cart) {
        return
    };
    
    const container = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        if (footer) {
            footer.style.display = 'none';
        }
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <p>${item.name}</p>
                </div>
                <div class="cart-item-actions">
                    <span>${item.price.toLocaleString("en-US")} Ar</span>
                    <button class="trash-btn" onclick="removeFromCart('${item.id}')">
    <i class="fa fa-trash"></i>
</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cart-total-price').textContent =
            total.toLocaleString("en-US") + " Ar";

        footer.style.display = 'flex';
    }
}

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        alert("This course is already in your cart!");
        return;
    }

    cart.push({ id, name, price, quantity: 1 });
    saveCart();
    updateCartCount();
    renderCartItems();

    const drawer = document.getElementById('cart-drawer');
    if (!drawer.classList.contains('open')) drawer.classList.add('open');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCartItems();
}

function confirmOrder() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
    showPurchasePopup();
}
function showPurchasePopup() {
    const popup = document.createElement('div');
    popup.className = 'purchase-popup';
    popup.innerHTML = `
        <div class="popup-icon">🎉</div>
        <div class="popup-text">
            <p class="popup-title">Thank you so much for buying our course!</p>
            <p class="popup-subtitle">We'll be in touch shortly with all the details. Welcome aboard!</p>
        </div>
        <button class="popup-close">&times;</button>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('visible');
    }, 50);

    const autoHide = setTimeout(() => {
        popup.classList.remove('visible');
        setTimeout(() => popup.remove(), 300);
    }, 8000);

    popup.querySelector('.popup-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        popup.classList.remove('visible');
        setTimeout(() => popup.remove(), 300);
    });
}

function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
}

function updateCartCount() {
    const count = cart.length;
    const badge = document.querySelector('.cart-count');
    if (count > 0) {
        badge.style.display = 'flex';
        badge.textContent = count;
    } else {
        badge.style.display = 'none';
    }
}

document.getElementById('cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});
document.getElementById('cart-close').addEventListener('click', closeCart);
const confirmBtn = document.getElementById('confirm-order-btn');
if (confirmBtn) {
  confirmBtn.addEventListener('click', confirmOrder);
}

updateCartCount();