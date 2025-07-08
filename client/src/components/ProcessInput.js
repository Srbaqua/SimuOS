import React from 'react';

function ProcessInput({ processes, setProcesses }) {
  const addProcess = () => setProcesses([...processes, { pid: '', arrivalTime: 0, burstTimes: [1], priority: 0 }]);
  const removeProcess = idx => setProcesses(processes.filter((_, i) => i !== idx));
  const updateProcess = (idx, field, value) => {
    const updated = [...processes];
    updated[idx][field] = value;
    setProcesses(updated);
  };

  return (
    <div>
      <h3>Processes</h3>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival Time</th>
            <th>Burst Times</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((proc, idx) => (
            <tr key={idx}>
              <td>
                <input value={proc.pid} onChange={e => updateProcess(idx, 'pid', e.target.value)} />
              </td>
              <td>
                <input type="number" value={proc.arrivalTime} onChange={e => updateProcess(idx, 'arrivalTime', Number(e.target.value))} />
              </td>
              <td>
                <input type="text" value={proc.burstTimes.join(',')} onChange={e => updateProcess(idx, 'burstTimes', e.target.value.split(',').map(Number))} />
              </td>
              <td>
                <input type="number" value={proc.priority} onChange={e => updateProcess(idx, 'priority', Number(e.target.value))} />
              </td>
              <td>
                <button onClick={() => removeProcess(idx)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addProcess}>Add Process</button>
    </div>
  );
}

export default ProcessInput;
