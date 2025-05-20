import React, { useState } from "react";

// Process input form component
function ProcessForm({ onAdd }) {
  const [name, setName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !arrival || !burst) return;
    onAdd({
      id: Date.now(),
      name,
      arrival: Number(arrival),
      burst: Number(burst),
    });
    setName("");
    setArrival("");
    setBurst("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Process Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Arrival Time"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        required
        min="0"
      />
      <input
        type="number"
        placeholder="Burst Time"
        value={burst}
        onChange={(e) => setBurst(e.target.value)}
        required
        min="1"
      />
      <button type="submit">Add Process</button>
    </form>
  );
}

// Process list component
function ProcessList({ processes }) {
  return (
    <table border="1" cellPadding="8" style={{ marginBottom: "1rem" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Arrival</th>
          <th>Burst</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((proc) => (
          <tr key={proc.id}>
            <td>{proc.name}</td>
            <td>{proc.arrival}</td>
            <td>{proc.burst}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Placeholder for scheduling result
function SchedulingResult({ processes }) {
  // Implement your scheduling logic here
  // Example: FCFS
  // For now, just display the process order
  return (
    <div>
      <h3>Scheduling Order (FCFS Example):</h3>
      <ol>
        {processes
          .slice()
          .sort((a, b) => a.arrival - b.arrival)
          .map((proc) => (
            <li key={proc.id}>
              {proc.name} (Arrival: {proc.arrival}, Burst: {proc.burst})
            </li>
          ))}
      </ol>
    </div>
  );
}

// Main App component
export default function App() {
  const [processes, setProcesses] = useState([]);

  const handleAddProcess = (proc) => {
    setProcesses((prev) => [...prev, proc]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <h1>OS Process Scheduling Simulator</h1>
      <ProcessForm onAdd={handleAddProcess} />
      <ProcessList processes={processes} />
      {processes.length > 0 && <SchedulingResult processes={processes} />}
    </div>
  );
}
