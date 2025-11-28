export function initFragrances() {
    const cards = document.querySelectorAll('.product_list .card');
    if (!cards.length) return;

    cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;

        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            const bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.alt = img.alt || '';
            lightbox.appendChild(bigImg);
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
}