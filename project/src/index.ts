import fetch from 'node-fetch';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/quote', async (_req: Request, res: Response) => {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json() as { q: string; a: string }[];
        res.json({ quote: data[0].q, author: data[0].a });
    } catch (error) {
        console.error('Quote fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
