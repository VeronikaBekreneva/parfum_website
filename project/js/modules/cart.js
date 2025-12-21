// cart.js находится в js/modules/
import { products } from "./product.js";              // продукт в той же папке modules
// cart.js
import { getCartByLS, saveCartByLS, addProductToCartByLS } from "./api/local-storage.js";


// 🔹 ИНИЦИАЛИЗАЦИЯ КОРЗИНЫ ИЗ LOCAL STORAGE
const cart = getCartByLS();

/**
 * Универсальная функция сохранения корзины
 */
function saveCart() {
    saveCartByLS(cart);
    renderCart();

    const addBtn = document.querySelector(".tocart_button[data-product-id]");
    if (addBtn) {
        const id = String(addBtn.dataset.productId);
        renderCartButton(addBtn, id);
    }
}

function renderCartButton(btn, productId) {
    const id = String(productId);
    const product = products[id];
    if (!product) {
        btn.textContent = "Add to cart";
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.disabled = false;
        return;
    }

    if (product.availability === "sold out") {
        btn.innerHTML = `<span class="tocart-content">Sold Out</span>`;
        btn.style.backgroundColor = "#ccc"; 
        btn.style.color = "#666";
        btn.style.cursor = "not-allowed";
        btn.disabled = true;
        return;
    } else {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    }
    const quantity = Number(cart[id] || 0);
    const maxQty = Number(product.quantity || 0);

    btn.innerHTML = "";
    btn.classList.remove("in-cart", "has-items");

    if (quantity > 0) {
        btn.classList.add("in-cart", "has-items");
        btn.style.backgroundColor = "var(--darkhover)";
        btn.style.color = "var(--white)";

        const minusBtn = document.createElement("button");
        minusBtn.type = "button";
        minusBtn.className = "qty-btn minus";
        minusBtn.textContent = "−";
        minusBtn.style.background = "none";
        minusBtn.style.border = "none";
        minusBtn.style.fontWeight = "700";
        minusBtn.style.cursor = "pointer";
        minusBtn.style.color = "var(--white)";
        minusBtn.setAttribute("aria-label", "Decrease quantity");

        const qtyText = document.createElement("span");
        qtyText.className = "in-cart-text";
        qtyText.textContent = String(quantity);

        const plusBtn = document.createElement("button");
        plusBtn.type = "button";
        plusBtn.className = "qty-btn plus";
        plusBtn.textContent = "+";
        plusBtn.style.background = "none";
        plusBtn.style.border = "none";
        plusBtn.style.fontWeight = "700";
        plusBtn.style.cursor = "pointer";
        plusBtn.setAttribute("aria-label", "Increase quantity");
        plusBtn.disabled = quantity >= maxQty;
        plusBtn.style.color = quantity >= maxQty ? "#ccc" : "var(--white)";
        
        minusBtn.addEventListener("click", () => {
            if (cart[id] > 0) {
                cart[id]--;
                if (cart[id] <= 0) delete cart[id];
                saveCart();
                renderCartButton(btn, id);
            }
        });

        plusBtn.addEventListener("click", () => {
            if (cart[id] < maxQty) {
                cart[id] = (cart[id] || 0) + 1;
                saveCart();
                renderCartButton(btn, id);
            } else {
                showProductNotice(`Максимальное количество — ${maxQty}`);
            }
        });

        btn.append(minusBtn, qtyText, plusBtn);
    } else {
        btn.innerHTML = `<span class="tocart-content">Add to cart</span>`;
        btn.style.backgroundColor = "var(--green)";
        btn.style.color = "var(--black)";
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("cart-total-price");
    const checkoutBtn = document.getElementById("cart-checkout");
    if (!cartItemsContainer || !totalPriceEl || !checkoutBtn) return;

    cartItemsContainer.innerHTML = "";
    const keys = Object.keys(cart).filter(k => cart[k] > 0);

    if (!keys.length) {
        cartItemsContainer.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
        totalPriceEl.textContent = "$0.00";
        checkoutBtn.style.display = "none";
        return;
    }

    checkoutBtn.style.display = "block";
    let total = 0;

    keys.forEach(rawId => {
        const id = String(rawId);
        const product = products[id];
        const quantity = cart[id];
        if (!product) return;
        total += product.price * quantity;

        const item = document.createElement("div");
        item.className = "cart-item";

        const row = document.createElement("div");
        row.className = "cart-item-row";

        const name = document.createElement("span");
        name.className = "cart-item-name";
        name.textContent = product.name;

        const controls = document.createElement("div");
        controls.className = "cart-item-controls";

        const minusBtn = document.createElement("button");
        minusBtn.type = "button";
        minusBtn.className = "qty-btn minus";
        minusBtn.textContent = "−";
        minusBtn.style.background = "none";
        minusBtn.style.border = "none";
        minusBtn.style.fontWeight = "700";
        minusBtn.style.cursor = "pointer";
        minusBtn.setAttribute("aria-label", "Decrease quantity");

        const qtySpan = document.createElement("span");
        qtySpan.textContent = String(quantity);

        const plusBtn = document.createElement("button");
        plusBtn.type = "button";
        plusBtn.className = "qty-btn plus";
        plusBtn.textContent = "+";
        plusBtn.style.background = "none";
        plusBtn.style.border = "none";
        plusBtn.style.fontWeight = "700";
        plusBtn.style.cursor = "pointer";
        plusBtn.setAttribute("aria-label", "Increase quantity");
        plusBtn.disabled = quantity >= product.quantity;
        plusBtn.style.color = quantity >= product.quantity ? "#ccc" : "var(--black)";

        minusBtn.addEventListener("click", () => {
            if (cart[id] > 0) {
                cart[id]--;
                if (cart[id] <= 0) delete cart[id];
                saveCart();
            }
        });

        plusBtn.addEventListener("click", () => {
            if (cart[id] < product.quantity) {
                cart[id]++;
                saveCart();
            }
        });

        controls.append(minusBtn, qtySpan, plusBtn);
        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = `$${(product.price * quantity).toFixed(2)}`;

        row.append(name, controls, price);
        item.appendChild(row);
        cartItemsContainer.appendChild(item);
    });

    totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function initCart() {
    // Временный блок для проверки работы localStorage
    console.log('Cart before adding:', getCartByLS());

    // Добавляем тестовый товар
    addProductToCartByLS({id: 999, name: 'Test Product', price: 100});

    console.log('Cart after adding:', getCartByLS());

    // ===== Дальше твой обычный initCart код =====
    const cartBtns = document.querySelectorAll(".menu_cart_btn, .mobile_cart_btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartModal = document.getElementById("cart-modal");
    const closeCartBtn = document.getElementById("close-cart");
    const checkoutBtn = document.getElementById("cart-checkout");

    const burgerBtn = document.querySelector(".menu_burger_btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (burgerBtn && mobileMenu && menuOverlay) {
        burgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            menuOverlay.classList.toggle("hidden");
        });

        menuOverlay.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuOverlay.classList.add("hidden");
        });
    }
    if (cartOverlay && cartModal) {
        cartBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                cartOverlay.classList.remove("hidden");
                cartModal.classList.remove("hidden");
                renderCart();
            });
        });

        closeCartBtn?.addEventListener("click", () => {
            cartOverlay.classList.add("hidden");
            cartModal.classList.add("hidden");
        });

        cartOverlay.addEventListener("click", () => {
            cartOverlay.classList.add("hidden");
            cartModal.classList.add("hidden");
        });

        cartModal.addEventListener("click", e => e.stopPropagation());
    }

    const addBtn = document.querySelector(".tocart_button[data-product-id]");
    if (addBtn) {
        const productId = String(addBtn.dataset.productId);
        renderCartButton(addBtn, productId);

        addBtn.addEventListener("click", e => {
            if (e.target.closest(".qty-btn")) return;
            if (!cart[productId]) cart[productId] = 1;
            saveCart();
            renderCartButton(addBtn, productId);
        });
    }

    checkoutBtn?.addEventListener("click", () => {
        console.log("Checkout button clicked");
    });

    renderCart();
}

export { initCart, cart, saveCart, renderCartButton };
