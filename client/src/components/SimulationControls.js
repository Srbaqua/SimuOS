import React from 'react';

function SimulationControls({ onSimulate, onStep, onReset, onPrevStep }) {
  return (
    <div style={{marginBottom: 20}}>
      <button onClick={onSimulate}>Simulate</button>
      <button onClick={onPrevStep}>Prev</button>
      <button onClick={onStep}>Next</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default SimulationControls;
