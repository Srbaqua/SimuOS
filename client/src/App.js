import './App.css'
import React, { useState } from 'react';
import ProcessInput from './components/ProcessInput';
import AlgorithmSelector from './components/AlgorithmSelector';
import SimulationControls from './components/SimulationControls';
import GanttChart from './components/GanttChart';
import MetricsTable from './components/MetricsTable';
import TimeLog from './components/TimeLog';
import LiveBarChart from './components/LiveBarChart';
import axios from 'axios';

function App() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [timeQuantum, setTimeQuantum] = useState(1);
  const [results, setResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSimulate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/simulate', {
        processes,
        algorithm,
        timeQuantum,
      });
      setResults(response.data);
      setCurrentStep(0);
    } catch (err) {
      setError('Simulation failed. Please check your inputs or try again.');
      setResults(null);
    }
    setLoading(false);
  };

  const handleStep = () => {
    if (results && results.timeLog && currentStep < results.timeLog.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (results && results.timeLog && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setResults(null);
    setCurrentStep(0);
    setError('');
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>CPU Scheduling Simulator</h1>
      <ProcessInput processes={processes} setProcesses={setProcesses} />
      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        timeQuantum={timeQuantum}
        setTimeQuantum={setTimeQuantum}
      />
      <SimulationControls
        onSimulate={handleSimulate}
        onStep={handleStep}
        onReset={handleReset}
        onPrevStep={handlePrevStep}
      />

      {loading && <div>Simulating...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {results && (
        <div style={{ marginTop: 30 }}>
          <h2>Gantt Chart</h2>
          <GanttChart schedule={results.schedule} />

          <h2>Metrics</h2>
          <MetricsTable metrics={results.metrics} />

          <h2>Step-through Simulation</h2>
          <div style={{ marginBottom: 10 }}>
            <button onClick={handlePrevStep} disabled={currentStep === 0}>Prev</button>
            <span style={{ margin: '0 10px' }}>Time: {currentStep}</span>
            <button
              onClick={handleStep}
              disabled={!results.timeLog || currentStep === results.timeLog.length - 1}
            >Next</button>
          </div>
          <TimeLog timeLog={results.timeLog} currentStep={currentStep} />

          <h2>Live Process State Bar Chart</h2>
          <LiveBarChart timeLog={results.timeLog} currentStep={currentStep} />
        </div>
      )}
    </div>
  );
}

export default App;
