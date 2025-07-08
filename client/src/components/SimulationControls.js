import React from 'react';

function SimulationControls({ onSimulate, onStep, onReset }) {
  return (
    <div>
      <button onClick={onSimulate}>Simulate</button>
      <button onClick={onStep}>Step</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default SimulationControls;
