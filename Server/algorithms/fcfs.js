// FCFS Scheduling Algorithm
function fcfs(processes) {
  // Sort by arrival time
  processes = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  let schedule = [];
  let metrics = {};
  let timeLog = [];

  for (let process of processes) {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    let start = currentTime;
    let burst = process.burstTimes.reduce((a, b) => a + b, 0);
    let end = start + burst;

    schedule.push({ pid: process.pid, start, end });

    metrics[process.pid] = {
      completionTime: end,
      turnaroundTime: end - process.arrivalTime,
      waitingTime: start - process.arrivalTime,
      responseTime: start - process.arrivalTime,
    };

    // Simple timeLog: one entry per process
    timeLog.push({
      time: start,
      running: process.pid,
      ready: processes.filter(p => p.arrivalTime <= start && p.pid !== process.pid && !metrics[p.pid]).map(p => p.pid),
      blocked: [],
      terminated: Object.keys(metrics).filter(pid => pid !== process.pid)
    });

    currentTime = end;
  }

  return { schedule, metrics, timeLog };
}

module.exports = fcfs;
