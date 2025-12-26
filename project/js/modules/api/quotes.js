const QUOTE_API_URL = 'https://corsproxy.io/?https://zenquotes.io/api/quotes';

let quotes = [];
let currentIndex = 0;

export const fetchQuotes = async () => {
    try {
        const response = await fetch(QUOTE_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        quotes = await response.json();
    } catch (error) {
        console.error('Quote fetch failed:', error);
        quotes = [];
    }
};

const getNextQuote = () => {
    if (!quotes.length) {
        return 'Could not load quote. Try again!';
    }

    const quote = quotes[currentIndex];
    currentIndex = (currentIndex + 1) % quotes.length;

    return quote.q; // ← ТОЛЬКО цитата
};

export const initQuotes = async () => {
    const quoteText = document.getElementById('quote-text');
    const newQuoteBtn = document.getElementById('new-quote');

    quoteText.textContent = 'Loading inspiration...';
    await fetchQuotes();

    const updateQuote = () => {
        quoteText.textContent = getNextQuote();
    };

    updateQuote();
    newQuoteBtn.addEventListener('click', updateQuote);
};
