require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const eventsRouter = require('./api/events');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.use('/api/events', eventsRouter);

// const authRouter = require('./api/auth');
// app.use('/api/auth', authRouter);

app.listen(3000, () => console.log('Server running on port 3000'));