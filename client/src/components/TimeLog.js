import React from 'react';

function TimeLog({ timeLog, currentStep }) {
  if (!timeLog || timeLog.length === 0) return null;
  const state = timeLog[currentStep];
  return (
    <div>
      <h4>Time: {currentStep}</h4>
      <pre style={{background:'#eee',padding:'10px'}}>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default TimeLog;
