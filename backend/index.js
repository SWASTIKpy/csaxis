const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the custom file
dotenv.config({ path: './mongo.env' });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        // Start the Express server only after a successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Example basic route
app.get('/', (req, res) => {
    res.send('Backend API is running.');
});
