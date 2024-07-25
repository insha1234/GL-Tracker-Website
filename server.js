const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/internsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a schema and model for intern data
const internSchema = new mongoose.Schema({
    name: String,
    role: String,
    description: String,
    photo: String,
    linkedin: String,
    github: String,
    website: String,
    instagram: String
});

const Intern = mongoose.model('Intern', internSchema);

// Route to get intern data
app.get('/api/interns', async (req, res) => {
    const interns = await Intern.find();
    res.send(interns);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
