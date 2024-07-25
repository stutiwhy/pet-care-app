// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Import routes
const petRoutes = require('../server/routes/petRoutes');
const activityRoutes = require('../server/routes/activityRoutes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

// Use routes
app.use('/pets', petRoutes);
app.use('/activities', activityRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
