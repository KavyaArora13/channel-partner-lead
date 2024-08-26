const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5005;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://kavyaarora1302:Kavya13@channel-partner-lead.hrfqt.mongodb.net/?retryWrites=true&w=majority&appName=channel-partner-lead', {
  
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));


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

app.get('/', (req, res) => {
    res.send('Welcome to the Channel Partner Lead Management System API');
});


app.post('/leads', async (req, res) => {
    
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(200).json(newLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
