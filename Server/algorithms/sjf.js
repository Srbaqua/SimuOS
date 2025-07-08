// SJF Scheduling Algorithm (Non-preemptive Shortest Job First)
function sjf(processes) {
  let currentTime = 0;
  let schedule = [];
  let metrics = {};
  let completed = new Set();
  let n = processes.length;
  let timeLog = [];

  while (completed.size < n) {
    let available = processes.filter(p => p.arrivalTime <= currentTime && !completed.has(p.pid));
    if (available.length === 0) {
      currentTime++;
      continue;
    }
    available.sort((a, b) => {
      let aBurst = a.burstTimes.reduce((x, y) => x + y, 0);
      let bBurst = b.burstTimes.reduce((x, y) => x + y, 0);
      return aBurst - bBurst;
    });
    let proc = available[0];
    let start = currentTime;
    let burst = proc.burstTimes.reduce((a, b) => a + b, 0);
    let end = start + burst;

    schedule.push({ pid: proc.pid, start, end });

    metrics[proc.pid] = {
      completionTime: end,
      turnaroundTime: end - proc.arrivalTime,
      waitingTime: start - proc.arrivalTime,
      responseTime: start - proc.arrivalTime,
    };

    timeLog.push({
      time: start,
      running: proc.pid,
      ready: processes.filter(p => p.arrivalTime <= start && p.pid !== proc.pid && !metrics[p.pid]).map(p => p.pid),
      blocked: [],
      terminated: Object.keys(metrics).filter(pid => pid !== proc.pid)
    });

    currentTime = end;
    completed.add(proc.pid);
  }

  return { schedule, metrics, timeLog };
}

module.exports = sjf;
