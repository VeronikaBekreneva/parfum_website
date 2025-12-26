const API_URL = 'http://localhost:3002/api/reactions';

const fetchReactionsFromServer = async () => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(res.status);
        return await res.json();
    } catch (e) {
        console.error('Failed to fetch reactions from server', e);
        return { diamond:0, bow:0, flower:0, like:0, dislike:0 };
    }
};

const sendReactionToServer = async (reactionType, count) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reaction: reactionType, count })
        });
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        console.log('Reaction updated on server:', data);
    } catch (e) {
        console.error('Failed to send reaction:', e);
    }
};

export const initReactions = async () => {
    const reactions = await fetchReactionsFromServer();
    const buttons = document.querySelectorAll('.reaction-btn');

    buttons.forEach(btn => {
        const type = btn.dataset.reaction;
        const countEl = btn.querySelector('.reaction-count');
        if(countEl) countEl.textContent = reactions[type] || 0;
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.reaction;
            reactions[type] = (reactions[type] || 0) + 1;

            const countEl = btn.querySelector('.reaction-count');
            if(countEl) countEl.textContent = reactions[type];

            btn.classList.add('reaction-clicked');
            setTimeout(() => btn.classList.remove('reaction-clicked'), 300);

            await sendReactionToServer(type, reactions[type]);
        });
    });
};
