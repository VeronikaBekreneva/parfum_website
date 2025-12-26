export function initMobileMenu() {
    const burger = document.querySelector(".mobile-burger");
    const menu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-menu-close");
    const burgerContainer = document.querySelector(".mobile-burger-container");

    if (!burger || !menu || !closeBtn) return;

    burger.addEventListener("click", () => {
        menu.classList.add("active");
        if (burgerContainer) burgerContainer.classList.add("hide");
    });

    closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
        if (burgerContainer) burgerContainer.classList.remove("hide");
    });

    menu.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            menu.classList.remove("active");
            if (burgerContainer) burgerContainer.classList.remove("hide");
        }
    });
}
