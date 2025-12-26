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

window.getCartByLS = getCartByLS;
window.addProductToCartByLS = addProductToCartByLS;

const LOCAL_STORAGE_LIKES_KEY = 'quoteLikes';

export const getLikesByLS = () => {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_LIKES_KEY);
        return raw ? JSON.parse(raw) : 0;
    } catch (e) {
        console.error('LocalStorage is not available', e);
        return 0;
    }
};

export const saveLikesByLS = (count) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_LIKES_KEY, JSON.stringify(count));
    } catch (e) {
        console.error('Failed to save likes', e);
    }
};
