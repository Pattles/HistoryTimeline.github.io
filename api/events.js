const express = require('express');
const router = express.Router();
const Event = require('../db');

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        
        let query = {};
        
        if (date) {
            query = { date: date };
        }
        
        const events = await Event.find(query);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
router.post('/', async (req, res) => {
    if (req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, artist, year, tags } = req.body;
    const song = await Song.create({ title, artist, year, tags });
    res.json(song);

    console.log(`Added song: ${title}`)
});
*/

module.exports = router;