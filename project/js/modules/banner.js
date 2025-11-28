export function initBanner() {
    const banner = document.querySelector('.banner');
    const closeBtn = document.querySelector('.close_btn');

    if (!banner || !closeBtn) return;

    if (sessionStorage.getItem('bannerClosed') === 'true') {
        banner.style.display = 'none';
        return;
    }

    closeBtn.addEventListener('click', () => {
        banner.style.transition = 'opacity .4s ease, transform .4s ease';
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-80px)';

        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);

        sessionStorage.setItem('bannerClosed', 'true');
    });
}