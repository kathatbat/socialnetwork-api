const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const PORT = process.env.PORT || 3001;
const thoughtRoutes = require('./routes/userThoughts.js');
const reactionRoutes = require('./routes/reactionRoutes');
const db = require('./config/connection');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);
app.use('/api', reactionRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

