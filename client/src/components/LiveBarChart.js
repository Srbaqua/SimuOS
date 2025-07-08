import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LiveBarChart({ timeLog, currentStep }) {
  if (!timeLog || timeLog.length === 0) return <div>No data to display</div>;

  // Prepare labels (time steps) up to currentStep
  const labels = timeLog.slice(0, currentStep + 1).map(entry => entry.time.toString());

  // Prepare datasets: count of processes in each state per time step
  const states = ['running', 'ready', 'blocked', 'terminated'];

  const datasets = states.map((state, idx) => {
    return {
      label: state.charAt(0).toUpperCase() + state.slice(1),
      data: timeLog.slice(0, currentStep + 1).map(entry => {
        if (state === 'running') {
          return entry.running ? 1 : 0;
        } else {
          return entry[state] ? entry[state].length : 0;
        }
      }),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',    // running - teal
        'rgba(255, 206, 86, 0.6)',    // ready - yellow
        'rgba(255, 99, 132, 0.6)',    // blocked - red
        'rgba(153, 102, 255, 0.6)'    // terminated - purple
      ][idx],
    };
  });

  const data = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Process States Over Time' }
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Number of Processes' }, beginAtZero: true, precision: 0 }
    }
  };

  return <Bar data={data} options={options} />;
}

export default LiveBarChart;
