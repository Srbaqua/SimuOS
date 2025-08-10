import React from 'react';

function TimeFunction({ timeLog, currentStep }) {
  if (!timeLog || timeLog.length === 0) return null;
  const state = timeLog[currentStep];

  return (
    <div>
      <h4>Time: {state.time}</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>State</th>
            <th style={{ border: '1px solid #ccc', padding: '6px' }}>Processes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>Running</td>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
              {state.running ? state.running : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>Ready</td>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
              {state.ready && state.ready.length ? state.ready.join(', ') : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>Blocked</td>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
              {state.blocked && state.blocked.length ? state.blocked.join(', ') : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>Terminated</td>
            <td style={{ border: '1px solid #ccc', padding: '6px' }}>
              {state.terminated && state.terminated.length ? state.terminated.join(', ') : '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeFunction;
