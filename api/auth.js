const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

module.exports = router;