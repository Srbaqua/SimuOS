const express = require('express');
const router = express.Router();
const Simulation = require('../models/Simulation');

// Create a new process set (or add a process)
router.post('/', async (req, res) => {
  try {
    const { processes } = req.body;
    const simulation = new Simulation({ processes, algorithm: 'FCFS' });
    await simulation.save();
    res.status(201).json(simulation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all process sets
router.get('/', async (req, res) => {
  const simulations = await Simulation.find();
  res.json(simulations);
});

// Update a process set
router.put('/:id', async (req, res) => {
  try {
    const updated = await Simulation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a process set
router.delete('/:id', async (req, res) => {
  try {
    await Simulation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
