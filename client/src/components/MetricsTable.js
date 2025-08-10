// components/MetricsTable.js
import React from 'react';

function MetricsTable({ metrics }) {
  if (!metrics || Object.keys(metrics).length === 0) {
    return <p>No metrics available. Run a simulation first.</p>;
  }

  const pids = Object.keys(metrics);

  let totalTurnaround = 0;
  let totalWaiting = 0;
  let totalResponse = 0;

  pids.forEach(pid => {
    totalTurnaround += metrics[pid].turnaroundTime || 0;
    totalWaiting += metrics[pid].waitingTime || 0;
    totalResponse += metrics[pid].responseTime || 0;
  });

  const avgTurnaround = (totalTurnaround / pids.length).toFixed(2);
  const avgWaiting = (totalWaiting / pids.length).toFixed(2);
  const avgResponse = (totalResponse / pids.length).toFixed(2);

  return (
    <div style={{ marginTop: 20 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>PID</th>
            <th>Completion Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
            <th>Response Time</th>
          </tr>
        </thead>
        <tbody>
          {pids.map(pid => (
            <tr key={pid}>
              <td>{pid}</td>
              <td>{metrics[pid].completionTime}</td>
              <td>{metrics[pid].turnaroundTime}</td>
              <td>{metrics[pid].waitingTime}</td>
              <td>{metrics[pid].responseTime}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ fontWeight: 'bold', backgroundColor: '#e0f7fa' ,color:'black'}}>
            <td>Average</td>
            <td>–</td>
            <td>{avgTurnaround}</td>
            <td>{avgWaiting}</td>
            <td>{avgResponse}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MetricsTable;
