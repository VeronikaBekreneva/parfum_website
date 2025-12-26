import { initBanner } from "./modules/banner.js";
import { initSubscribe } from "./modules/subscribe.js";
import { initReviews } from "./modules/reviews.js";
import { initFragrances } from "./modules/fragrances.js";
import { initProduct } from "./modules/product.js";
import { initCart} from './modules/cart.js';
import { initMobileMenu } from "./modules/MobileMenu.js";
import { initNavigation } from "./modules/navigation.js";
import { getUserLocation } from "./modules/api/geolocation.js";
import { initQuotes } from './modules/api/quotes.js';
import { initReactions } from './modules/reactions.js';

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initBanner();
    initSubscribe();
    initReviews();
    initFragrances();
    initProduct();
    initCart();
    initNavigation();
    getUserLocation();
    initQuotes();
    initReactions();
});