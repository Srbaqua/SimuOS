import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const algorithmInfo = {
  FCFS: "First Come First Serve: Non-preemptive, based on arrival time.",
  SJF: "Shortest Job First: Non-preemptive, selects process with shortest burst.",
  SRTF: "Shortest Remaining Time First: Preemptive version of SJF.",
  // LJF: "Longest Job First: Non-preemptive, longest burst gets priority.",
  // LRTF: "Longest Remaining Time First: Preemptive version of LJF.",
  RR: "Round Robin: Preemptive, uses fixed time quantum to rotate processes.",
  // HRRN: "Highest Response Ratio Next: Non-preemptive, dynamic priority.",
  // PNP: "Priority Non-Preemptive: Higher priority runs first, no preemption.",
  // PP: "Priority Preemptive: Higher priority interrupts current process.",
};

function AlgorithmSelector({ algorithm, setAlgorithm, timeQuantum, setTimeQuantum }) {
  return (
    <div>
      <label htmlFor="algorithm-select">Algorithm: </label>
      <select
        id="algorithm-select"
        value={algorithm}
        onChange={e => setAlgorithm(e.target.value)}
        data-tooltip-id="global-tooltip"
        data-tooltip-content={algorithmInfo[algorithm]}
      >
        {Object.keys(algorithmInfo).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {algorithm === 'RR' && (
        <span style={{ marginLeft: 10 }}>
          <label>Time Quantum: </label>
          <input
            type="number"
            min="1"
            value={timeQuantum}
            onChange={e => setTimeQuantum(Number(e.target.value))}
          />
        </span>
      )}

      <Tooltip id="global-tooltip" place="right" />
    </div>
  );
}

export default AlgorithmSelector;
