// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

mongoose.connect('mongodb://localhost:27017/channel-partner-leads', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection

// Lead Schema
const leadSchema = new mongoose.Schema({
    channelPartnerCode: String,
    leadName: String,
    contactNumber: String,
    email: String,
    leadSource: String,
    leadInterest: String,
    additionalNotes: String,
    createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model('Lead', leadSchema);

// Routes
app.post('/api/leads', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(200).send('Lead submitted successfully');
    } catch (error) {
        res.status(500).send('Error submitting lead');
    }
});

app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).send('Error fetching leads');
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));