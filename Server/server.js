const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const simulationRoutes = require('./routes/Simulation');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simuos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use simulation routes
app.use('/api', simulationRoutes);

const processRoutes = require('./routes/processes');
app.use('/api/processes', processRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
