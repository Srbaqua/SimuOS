const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const simulationRoutes = require('./routes/simulation');
const simulationRoutes = require('./routes/Simulation');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://simu-os-project.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  


// Use simulation routes
app.use('/api', simulationRoutes);


const processRoutes = require('./routes/processes');
app.use('/api/processes', processRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
