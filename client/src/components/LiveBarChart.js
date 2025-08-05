// components/LiveBarChart.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const stateColors = {
  running: '#4CAF50',
  ready: '#2196F3',
  blocked: '#FFC107',
  terminated: '#F44336',
  none: '#e0e0e0'
};

function transformData(timeLog, currentStep) {
  if (!timeLog || timeLog.length === 0) return [];

  const processIds = Array.from(new Set(
    timeLog.flatMap(entry =>
      [
        ...(entry.ready || []),
        ...(entry.blocked || []),
        ...(entry.terminated || []),
        ...(entry.running ? [entry.running] : []),
      ]
    )
  ));

  const slicedLog = timeLog.slice(0, currentStep + 1);
  // const timePoints = slicedLog.map((step, index) => `T${step.time ?? index}`);

  return processIds.map(pid => {
    const row = { name: pid };
    slicedLog.forEach((step, idx) => {
      let state = 'none';
      if (step.running === pid) state = 'running';
      else if (step.ready?.includes(pid)) state = 'ready';
      else if (step.blocked?.includes(pid)) state = 'blocked';
      else if (step.terminated?.includes(pid)) state = 'terminated';
      row[`T${step.time}`] = state;
    });
    return row;
  });
}

const getStackedData = (data, timeLog) => {
  const allStates = ['running', 'ready', 'blocked', 'terminated', 'none'];
  const timeLabels = timeLog.map(step => `T${step.time}`);

  return data.map(row => {
    const newRow = { name: row.name };

    timeLabels.forEach(label => {
      const state = row[label] || 'none';
      allStates.forEach(s => {
        newRow[`${label}_${s}`] = state === s ? 1 : 0;
      });
    });

    return newRow;
  });
};


const LiveBarChart = ({ timeLog, currentStep }) => {
  const rawData = transformData(timeLog, currentStep);
  if (!rawData.length) return null;

  const timeLabels = timeLog.slice(0, currentStep + 1).map(step => `T${step.time}`);
  const data = getStackedData(rawData, timeLog.slice(0, currentStep + 1));

  const allStates = ['running', 'ready', 'blocked', 'terminated', 'none'];
  const allBars = [];

  timeLabels.forEach(label => {
    allStates.forEach(state => {
      allBars.push({ key: `${label}_${state}`, color: stateColors[state] });
    });
  });

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Process State Timeline</h3>
      <ResponsiveContainer width="100%" height={60 + data.length * 40}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          {allBars.map(bar => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              stackId="timeline"
              fill={bar.color}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', gap: '10px', marginTop: 12, flexWrap: 'wrap' }}>
        {Object.entries(stateColors).map(([state, color]) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 16, height: 16, backgroundColor: color, borderRadius: 4 }} />
            <span style={{ fontSize: '0.9rem' }}>{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveBarChart;
