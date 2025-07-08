import React from 'react';

function MetricsTable({ metrics }) {
  if (!metrics) return null;
  const pids = Object.keys(metrics);

  return (
    <table>
      <thead>
        <tr>
          <th>PID</th>
          <th>Completion</th>
          <th>Turnaround</th>
          <th>Waiting</th>
          <th>Response</th>
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
    </table>
  );
}

export default MetricsTable;
