// Updated App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import ProcessInput from './components/ProcessInput';
import AlgorithmSelector from './components/AlgorithmSelector';
import SimulationControls from './components/SimulationControls';
import GanttChart from './components/GanttChart';
import MetricsTable from './components/MetricsTable';
import TimeLog from './components/TimeFunction';
import LiveBarChart from './components/LiveBarChart';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import About from './components/About';
// import { useEffect } from 'react';


function App() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [timeQuantum, setTimeQuantum] = useState(1);
  const [results, setResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [section, setSection] = useState('simulator');

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const handleSimulate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/simulate`, {
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
    <div className="main-layout">
      <nav className="navbar">
  <div className="navbar-left">
    <img
      src={darkMode ? "/logo_dark.png" : "/logo_light.png"}
      alt="SimuOS Logo"
      className="navbar-logo"
      style={{width:'80px',height:'60px'}}
    />
    

  </div>

  <button
    onClick={() => setDarkMode(prev => !prev)}
    className="toggle-theme-btn"
  >
    {darkMode ? '🌙 Dark' : '☀️ Light'}
  </button>
</nav>


      <div className="app-body">
        <aside className="sidebar">
          <ul>
            <li onClick={() => setSection('simulator')} data-tip="Enter process list and parameters">Simulator</li>
            <li onClick={() => setSection('metrics')} data-tip="View average waiting, turnaround time, etc.">Metrics</li>
            <li onClick={() => setSection('about')} data-tip="How this tool works">About</li>
          </ul>
        </aside>

        <main className="container">
          {section === 'simulator' && (
            <>
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
              {loading && <div className="loading-message">Simulating...</div>}
              {error && <div className="error-message">{error}</div>}
              {results && (
                <>
                  <h2>Gantt Chart</h2>
                  <GanttChart schedule={results.schedule} />
                  <h2>Metrics</h2>
                  <MetricsTable metrics={results.metrics} />

                  <h2>Step-through Simulation</h2>
                  <div style={{ marginBottom: 10 }}>
                    <button onClick={handlePrevStep} disabled={currentStep === 0}>Prev</button>
                    <span style={{ margin: '0 10px' }}>Time: {currentStep}</span>
                    <button onClick={handleStep} disabled={!results.timeLog || currentStep === results.timeLog.length - 1}>Next</button>
                  </div>
                  <TimeLog timeLog={results.timeLog} currentStep={currentStep} />

                  <LiveBarChart timeLog={results.timeLog} currentStep={currentStep} />
                </>
              )}
            </>
          )}

          {section === 'metrics' && results && (
            <>
              <h1>Metrics</h1>
              <MetricsTable metrics={results.metrics} />
            </>
          )}

          {section === 'about' && <About />}

        </main>
      </div>

      <Tooltip place="right" type="dark" effect="solid" multiline={true} />
    </div>
  );
}

export default App;