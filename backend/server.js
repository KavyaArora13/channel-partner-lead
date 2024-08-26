const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from a .env file
const mongoUri = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Schema for leads
const leadSchema = new mongoose.Schema({
    channelPartnerCode: String,
    leadName: String,
    contactNumber: String,
    email: String,
    leadSource: String,
    leadInterest: String,
    additionalNotes: String,
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Channel Partner Lead Management System API');
});

// Create a new lead
app.post('/leads', async (req, res) => {
    
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(200).json(newLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all leads
app.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
