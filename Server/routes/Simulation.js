const express = require('express');
const router = express.Router();
const Simulation = require('../models/Simulation');
// --- FCFS Algorithm ---
const fcfs = require('../algorithms/fcfs');

// --- SJF Algorithm (Non-preemptive) ---
const sjf = require('../algorithms/sjf');

// --- SRTF Algorithm (Preemptive SJF) ---
const srtf = require('../algorithms/srtf');

// --- RR Algorithm---
const rr = require('../algorithms/rr');

// --- Algorithm Map ---
const algorithms = {
  FCFS: fcfs,
  SJF: sjf,
  SRTF: srtf,
  RR:rr,
  // Add more algorithms here as needed
};

// --- Simulation API Route ---
router.post('/simulate', async (req, res) => {
  try {
    const { processes, algorithm, timeQuantum, contextSwitchTime } = req.body;

    if (!processes || !algorithm) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!algorithms[algorithm]) {
      return res.status(400).json({ error: 'Unsupported algorithm' });
    }

    // Run the selected algorithm
    const result = algorithms[algorithm](processes, timeQuantum, contextSwitchTime);

    // Save simulation to MongoDB
    if (typeof Simulation === 'function') {
      const simulation = new Simulation({
        processes,
        algorithm,
        timeQuantum,
        contextSwitchTime,
        results: result,
      });
      await simulation.save();
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
