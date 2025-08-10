// components/GanttChart.js
import React from 'react';
import { Chart } from 'react-google-charts';
import { getColorForProcess } from '../components/colorUtils';

function GanttChart({ schedule }) {
  if (!schedule || schedule.length === 0) return <div>No schedule data.</div>;

  const data = [
    [
      { type: "string", id: "Process" },
      { type: "string", id: "Task" },
      { type: "number", id: "Start" },
      { type: "number", id: "End" }
    ],
    ...schedule.map(item => [
      item.pid,
      item.pid,
      item.start,
      item.end
    ])
  ];

  const colors = schedule.map(item => getColorForProcess(item.pid));

  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      height="200px"
      options={{ colors }}
    />
  );
}

export default GanttChart;
