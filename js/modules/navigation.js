function isHomePage() {
    return (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === ""
    );
}

function setupScrollLink(selector, targetId) {
    const links = document.querySelectorAll(selector);

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            if (isHomePage()) {
                document.getElementById(targetId)
                    ?.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.href = `index.html#${targetId}`;
            }
        });
    });
}

function goToShop() {
    window.location.href = "src/shop.html";
}

export function initNavigation() {
    setupScrollLink(".contact-link", "contact");
    setupScrollLink(".about-link", "about");
}
