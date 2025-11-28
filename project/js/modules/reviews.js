export function initReviews() {
    const reviewsList = document.querySelector('.reviews_list');
    if (!reviewsList) return;

    const prevBtn = document.querySelector('.reviews_arrows .arrow:first-child');
    const nextBtn = document.querySelector('.reviews_arrows .arrow:last-child');

    let scrollAmount = 0;
    const cardWidth = reviewsList.querySelector('.reviewcard')?.offsetWidth || 300;
    
    prevBtn.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        reviewsList.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        scrollAmount += cardWidth;
        if (scrollAmount > reviewsList.scrollWidth - reviewsList.clientWidth) {
            scrollAmount = reviewsList.scrollWidth - reviewsList.clientWidth;
        }
        reviewsList.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
}
