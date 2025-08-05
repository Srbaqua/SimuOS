import React from 'react';

const About = () => {
  return (
    <div style={{ lineHeight: '1.8' }}>
      <h1>About SimuOS</h1>
      <p>
        <strong>SimuOS</strong> is a visual simulation tool to understand how CPU scheduling algorithms work.
        It helps you visualize process execution using Gantt charts, step-through timelines, and performance metrics.
      </p>

      <h2 style={{ marginTop: '25px' }}>CPU Scheduling Algorithms</h2>

      {[
        {
          title: '1. FCFS (First-Come, First-Served)',
          content: `• Processes are executed in order of arrival.\n• Non-preemptive.\n• Simple but can lead to long waiting time if early jobs are large.\n• Best for: Batch systems.`
        },
        {
          title: '2. SJF (Shortest Job First)',
          content: `• Picks process with the shortest burst time.\n• Can be preemptive or non-preemptive.\n• Requires burst time prediction.\n• Best for: Predictable systems.`
        },
        {
          title: '3. RR (Round Robin)',
          content: `• Each process gets a fixed time quantum.\n• Preemptive and fair.\n• Performance depends on time quantum.\n• Best for: Time-sharing systems.`
        },
        {
          title: '4. Priority Scheduling',
          content: `• Executes higher-priority processes first.\n• Can be preemptive or non-preemptive.\n• May lead to starvation.\n• Best for: Real-time systems.`
        },
        {
          title: '5. Multilevel Queue',
          content: `• Divides processes into queues (e.g., system/user).\n• Each queue uses a different algorithm.\n• No process movement between queues.\n• Best for: OS-level scheduling.`
        }
      ].map((algo, idx) => (
        <details key={idx} style={{ marginTop: '16px', background: 'var(--card-bg)', padding: '12px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <summary style={{ fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
            {algo.title}
          </summary>
          <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap', fontSize: '0.95rem', color: 'var(--text-color)' }}>
            {algo.content}
          </pre>
        </details>
      ))}

      {/* <h2 style={{ marginTop: '30px' }}>How to Use SimuOS</h2>
      <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
        <li>Go to the <strong>Simulator</strong> tab and add processes.</li>
        <li>Choose an algorithm and click <strong>Simulate</strong>.</li>
        <li>Use <strong>Step-through</strong> to view each time unit.</li>
        <li>Check <strong>Metrics</strong> to analyze performance.</li>
        <li>Visit <strong>Compare</strong> to compare multiple algorithms (if enabled).</li>
      </ul> */}

      <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'gray' }}>
        SimuOS is built for learners and developers to better understand CPU scheduling in operating systems.
      </p>
    </div>
  );
};

export default About;
