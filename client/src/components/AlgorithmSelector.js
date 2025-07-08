import React from 'react';

function AlgorithmSelector({ algorithm, setAlgorithm, timeQuantum, setTimeQuantum }) {
  return (
    <div>
      <label>Algorithm: </label>
      <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="SRTF">SRTF</option>
        <option value="LJF">LJF</option>
        <option value="LRTF">LRTF</option>
        <option value="RR">Round Robin</option>
        <option value="HRRN">HRRN</option>
        <option value="PNP">Priority Non-Preemptive</option>
        <option value="PP">Priority Preemptive</option>
      </select>
      {algorithm === 'RR' && (
        <span>
          <label> Time Quantum: </label>
          <input
            type="number"
            min="1"
            value={timeQuantum}
            onChange={e => setTimeQuantum(Number(e.target.value))}
          />
        </span>
      )}
    </div>
  );
}

export default AlgorithmSelector;
