export const products = {
    1: {
    id: "1",
    name: "Meadow",
    desc: "Captures the essence of a carefree breeze through wildflower fields, evoking pure joy with its light and refreshing notes.",
    shortDesc: "AIRY & JOYFUL",
    price: 39.95,
    imgs: ["../src/images/meadow1.png", "../src/images/meadow2.png"],
    notes: "Top: Lemon, Bergamot | Middle: Jasmine, Lily | Base: Musk, Vanilla",
    ingredients: "Alcohol Denat., Aqua, Parfum, Limonene, Linalool",
    quantity: 0,
    availability: "sold out"
    },
    2: {
    id: "2",
    name: "Jardinea",
    desc: "A rich bouquet of strongly floral aromas, capturing the essence of a vibrant garden in full bloom.",
    shortDesc: "STRONGLY FLORAL",
    price: 39.95,
    imgs: ["../src/images/jardinea.png", "../src/images/meadow2.png"],
    notes: "Top: Rose, Peony | Middle: Violet, Jasmine | Base: Sandalwood, Amber",
    ingredients: "Alcohol Denat., Aqua, Parfum, Limonene, Citronellol",
    quantity: 10,
    availability: "in stock"
    },
    3: {
    id: "3",
    name: "Lavanda",
    desc: "Calming lavender notes to soothe your senses and create a serene, relaxing atmosphere.",
    shortDesc: "CALMING",
    price: 39.95,
    imgs: ["../src/images/lavanda.png", "../src/images/meadow2.png"],
    notes: "Top: Lavender, Bergamot | Middle: Rosemary, Geranium | Base: Cedarwood, Musk",
    ingredients: "Alcohol Denat., Aqua, Parfum, Linalool, Limonene",
    quantity: 5,
    availability: "in stock"
    },
    4: {
    id: "4",
    name: "Neroli",
    desc: "Deep & sweet essence of neroli flowers, evoking elegance and warmth.",
    shortDesc: "DEEP & SWEET",
    price: 39.95,
    imgs: ["../src/images/neroli.png", "../src/images/meadow2.png"],
    notes: "Top: Orange Blossom, Petitgrain | Middle: Neroli, Jasmine | Base: Musk, Amber",
    ingredients: "Alcohol Denat., Aqua, Parfum, Linalool, Citral",
    quantity: 0,
    availability: "sold out"
    },
    5: {
    id: "5",
    name: "Spritz",
    desc: "A fruity and light fragrance, perfect for fresh, energetic vibes.",
    shortDesc: "FRUITY & LIGHT",
    price: 39.95,
    imgs: ["../src/images/spritz.png", "../src/images/meadow2.png"],
    notes: "Top: Grapefruit, Orange | Middle: Peach, Apple | Base: White Musk, Cedar",
    ingredients: "Alcohol Denat., Aqua, Parfum, Limonene, Citral",
    quantity: 12,
    availability: "in stock"
    },
    6: {
    id: "6",
    name: "Powder",
    desc: "Soft, delicate, and comforting scent that evokes warmth and gentle elegance.",
    shortDesc: "SOFT & DELICATE",
    price: 39.95,
    imgs: ["../src/images/powder.png", "../src/images/meadow2.png"],
    notes: "Top: Iris, Violet | Middle: Powdery Accord | Base: Musk, Vanilla",
    ingredients: "Alcohol Denat., Aqua, Parfum, Linalool, Limonene",
    quantity: 7,
    availability: "in stock"
    },
    7: {
    id: "7",
    name: "Citrus",
    shortDesc: "TANGY",
    desc: "Fresh citrus fragrance to energize your day.",
    price: 39.95,
    imgs: ["../src/images/citrus.png", "../src/images/meadow2.png"],
    notes: "Top: Orange, Lemon | Middle: Grapefruit | Base: Musk",
    ingredients: "Alcohol Denat., Aqua, Parfum, Limonene, Citral",
    quantity: 8,
    availability: "in stock"
    }
};

export function initProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id") || "1";
    const product = products[id];
    if (!product) return null;

    const setText = (selector, text) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    };

    setText(".product_info .h1", product.name);
    setText(".product_quick_info .accent_text", product.shortDesc);
    setText(".product_quick_info .paragraph_large", `$${product.price.toFixed(2)}`);
    setText(".product_desc", product.desc);
    setText(".product_quantity .quantity a", String(product.quantity));
    const availAnchor = document.querySelector(".availability_soldout a");
    if (availAnchor) {
        availAnchor.textContent = product.availability;
        const container = availAnchor.closest(".availability_soldout");
        if (container) {
            container.classList.remove("sold-out", "in-stock");
            container.classList.add(product.availability === "sold out" ? "sold-out" : "in-stock");
        }
    }

const btn = document.querySelector(".tocart_button") || document.querySelector(".add-to-cart");
if (btn) {
    btn.dataset.productId = product.id;
    btn.textContent = "Add to cart";
    btn.disabled = product.availability === "sold out";
}

    const imgContainer = document.querySelector(".product_photo");
    if (imgContainer) {
        imgContainer.innerHTML = "";
        product.imgs.forEach((src, i) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = product.name + (i ? " image 2" : "");
            img.className = "product_photo img";
            imgContainer.appendChild(img);
        });
    }

    const formatNotes = (notesString) =>
        notesString
            .split("|")
            .map((part) => {
                const [title, rest] = part.split(":");
                return rest ? `<div class="note_line"><strong>${title.trim()}:</strong> ${rest.trim()}</div>` : `<div class="note_line">${part.trim()}</div>`;
            })
            .join("");

    const notesEl = document.querySelector(".notes_text");
    if (notesEl) notesEl.innerHTML = formatNotes(product.notes);
    const ingEl = document.querySelector(".ingredients_text");
    if (ingEl) ingEl.textContent = product.ingredients;

    document.querySelectorAll(".collapsible").forEach((block) => {
        const header = block.querySelector(".collapsible-header");
        const icon = block.querySelector(".plus_icon");
        if (!header || !icon) return;
        icon.textContent = "add";
        header.addEventListener("click", () => {
            block.classList.toggle("active");
            icon.textContent = block.classList.contains("active") ? "remove" : "add";
        });
    });

    return { id: product.id, product };
}
