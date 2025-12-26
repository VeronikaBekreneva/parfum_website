export function initSubscribe() {
    const form = document.querySelector('.contactbanner_form');
    if (!form) return;

    const input = form.querySelector('input[type="email"]');
    if (!input) return;

    let message = document.createElement('div');
    message.className = 'subscribe_message';
    form.appendChild(message);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = input.value.trim();
        const flowerIcon = `<span class="material-icons subscribe_flower">local_florist</span>`;

        if (!email) {
            message.innerHTML = `${flowerIcon} Введите email!`;
            message.classList.add('show');
            return;
        }

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(email)) {
            message.innerHTML = `${flowerIcon} Введите корректный email!`;
            message.classList.add('show');
            return;
        }

        message.innerHTML = `${flowerIcon} Спасибо за подписку, ${email}!`;
        message.classList.add('show');
        input.value = '';

        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    });
}
