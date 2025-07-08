import React from 'react';

function AlgorithmSelector({ algorithm, setAlgorithm, timeQuantum, setTimeQuantum }) {
  return (
    <div>
      <h3>Algorithm</h3>
      <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="SRTF">SRTF</option>
        {/* <option value="LJF">LJF</option> */}
        {/* <option value="LRTF">LRTF</option> */}
        <option value="RR">Round Robin</option>
        {/* <option value="HRRN">HRRN</option> */}
        {/* <option value="PNP">Priority Non-Preemptive</option> */}
        {/* <option value="PP">Priority Preemptive</option> */}
      </select>
      {algorithm === 'RR' && (
        <div>
          <label>Time Quantum: </label>
          <input type="number" value={timeQuantum} onChange={e => setTimeQuantum(Number(e.target.value))} />
        </div>
      )}
    </div>
  );
}

export default AlgorithmSelector;
