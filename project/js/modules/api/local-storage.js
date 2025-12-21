const LOCAL_STORAGE_CART_KEY = 'cart';

export const getCartByLS = () => {
    try {
        const rawCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        return rawCart ? JSON.parse(rawCart) : {};
    } catch (e) {
        console.error('LocalStorage is not available', e);
        return {};
    }
};

export const saveCartByLS = (cart) => {
    try {
        localStorage.setItem(
            LOCAL_STORAGE_CART_KEY,
            JSON.stringify(cart)
        );
    } catch (e) {
        console.error('Failed to save cart', e);
    }
};

export const addProductToCartByLS = (product) => {
    const cart = getCartByLS();

    if (cart[product.id]) {
        cart[product.id] += 1;
    } else {
        cart[product.id] = 1;
    }

    saveCartByLS(cart);
};

// Для теста в консоли
window.getCartByLS = getCartByLS;
window.addProductToCartByLS = addProductToCartByLS;
