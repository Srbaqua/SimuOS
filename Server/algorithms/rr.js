// Round Robin Scheduling Algorithm
function rr(processes, timeQuantum = 1) {
  let n = processes.length;
  let queue = [];
  let currentTime = 0;
  let schedule = [];
  let metrics = {};
  let remaining = {};
  let arrivalTimes = {};
  let completed = new Set();
  let timeLog = [];
  let firstResponse = {};

  for (let p of processes) {
    remaining[p.pid] = p.burstTimes.reduce((a, b) => a + b, 0);
    arrivalTimes[p.pid] = p.arrivalTime;
  }

  // Sort processes by arrival time
  processes = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  let i = 0; // index for processes
  while (completed.size < n) {
    // Add all processes that have arrived by currentTime
    while (i < n && processes[i].arrivalTime <= currentTime) {
      if (!queue.includes(processes[i].pid) && !completed.has(processes[i].pid)) {
        queue.push(processes[i].pid);
      }
      i++;
    }

    if (queue.length === 0) {
      currentTime++;
      continue;
    }

    let pid = queue.shift();
    let burstLeft = remaining[pid];
    let runTime = Math.min(timeQuantum, burstLeft);
    let start = currentTime;
    let end = start + runTime;

    schedule.push({ pid, start, end });

    if (firstResponse[pid] === undefined) {
      let proc = processes.find(p => p.pid === pid);
      firstResponse[pid] = start - proc.arrivalTime;
    }

    remaining[pid] -= runTime;
    currentTime = end;

    // Add newly arrived processes during this time
    while (i < n && processes[i].arrivalTime <= currentTime) {
      if (!queue.includes(processes[i].pid) && !completed.has(processes[i].pid) && processes[i].pid !== pid) {
        queue.push(processes[i].pid);
      }
      i++;
    }

    if (remaining[pid] > 0) {
      queue.push(pid);
    } else {
      completed.add(pid);
      let proc = processes.find(p => p.pid === pid);
      metrics[pid] = {
        completionTime: currentTime,
        turnaroundTime: currentTime - proc.arrivalTime,
        waitingTime: currentTime - proc.arrivalTime - proc.burstTimes.reduce((a, b) => a + b, 0),
        responseTime: firstResponse[pid]
      };
    }

    timeLog.push({
      time: start,
      running: pid,
      ready: queue.slice(),
      blocked: [],
      terminated: Array.from(completed)
    });
  }

  return { schedule, metrics, timeLog };
}

module.exports = rr;
