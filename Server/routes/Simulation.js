const express = require('express');
const router = express.Router();
const Simulation = require('../models/Simulation');

// Import your algorithms
const fcfs = require('../algorithms/fcfs');
const sjf = require('../algorithms/sjf');
const srtf = require('../algorithms/srtf');
// const sjf = require('../algorithms/sjf');
// ... import other algorithms

const algorithms = {
  FCFS: fcfs,
  SJF: sjf,
  SRTF: srtf,
  // LJF: ljf,
  // LRTF: lrtf,
//   RR: rr,
  // HRRN: hrrn,
  // PNP: pnp,
  // PP: pp,
};

router.post('/simulate', async (req, res) => {
  try {
    const { processes, algorithm, timeQuantum, contextSwitchTime } = req.body;

    if (!algorithms[algorithm]) {
      return res.status(400).json({ error: 'Unsupported algorithm' });
    }

    // Run the selected algorithm
    const result = algorithms[algorithm](processes, timeQuantum, contextSwitchTime);

    // Save simulation to MongoDB
    const simulation = new Simulation({
      processes,
      algorithm,
      timeQuantum,
      contextSwitchTime,
      results: result,
    });

    await simulation.save();

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
