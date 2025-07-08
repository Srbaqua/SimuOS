import { Chart } from "react-google-charts";

function GanttChart({ schedule }) {
  // Transform schedule to Google Charts format
  const data = [
    [
      { type: "string", id: "Process" },
      { type: "string", id: "Task" },
      { type: "number", id: "Start" },
      { type: "number", id: "End" },
    ],
    // Example: ["P1", "P1", 0, 5]
    ...schedule.map(item => [item.pid, item.pid, item.start, item.end]),
  ];

  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      height="200px"
      options={{}}
    />
  );
}
export default GanttChart;