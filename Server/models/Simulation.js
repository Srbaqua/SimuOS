const mongoose = require('mongoose');

// Process schema
const ProcessSchema = new mongoose.Schema({
  pid: { type: String, required: true },
  arrivalTime: { type: Number, required: true },
  burstTimes: [{ type: Number, required: true }], // Array of CPU bursts
  ioTimes: [{ type: Number }], // Optional IO times
  priority: { type: Number, default: 0 },
});

// Simulation schema
const SimulationSchema = new mongoose.Schema({
  processes: [ProcessSchema],
  algorithm: { type: String, required: true },
  timeQuantum: { type: Number },
  contextSwitchTime: { type: Number, default: 0 },
  results: { type: Object }, // Stores schedule, metrics, time logs
  createdAt: { type: Date, default: Date.now },
});

const Simulation = mongoose.model('Simulation', SimulationSchema);
module.exports = Simulation;

