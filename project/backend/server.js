const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'reactions.json');

const defaultReactions = {
    diamond: 0,
    bow: 0,
    flower: 0,
    like: 0,
    dislike: 0
};

const loadReactions = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(defaultReactions, null, 2));
        return { ...defaultReactions };
        }
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error('Failed to load reactions:', e);
        return { ...defaultReactions };
    }
};

const saveReactions = (reactions) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reactions, null, 2));
};

let reactions = loadReactions();

app.get('/api/reactions', (req, res) => {
    res.json(reactions);
});

app.post('/api/reactions', (req, res) => {
    const { reaction } = req.body;

    if (!reaction || !(reaction in reactions)) {
        return res.status(400).json({ error: 'Unknown reaction type' });
    }

    reactions[reaction] += 1;
    saveReactions(reactions);

    res.json({
        message: 'Reaction updated',
        reactions
    });
});

    app.listen(PORT, () => {
    console.log(`Reactions server running on http://localhost:${PORT}`);
});
