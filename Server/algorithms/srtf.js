function srtf(processes) {
  let n = processes.length;
  let remaining = {};
  let arrivalTimes = {};
  let completed = new Set();
  let currentTime = 0;
  let schedule = [];
  let metrics = {};
  let timeLog = [];
  let firstResponse = {};

  for (let p of processes) {
    remaining[p.pid] = p.burstTimes.reduce((a, b) => a + b, 0);
    arrivalTimes[p.pid] = p.arrivalTime;
  }

  let lastPid = null;
  let startTime = 0;

  while (completed.size < n) {
    let available = processes.filter(p => p.arrivalTime <= currentTime && !completed.has(p.pid));
    if (available.length === 0) {
      if (lastPid !== null) {
        schedule.push({ pid: lastPid, start: startTime, end: currentTime });
        lastPid = null;
      }
      timeLog.push({ time: currentTime, running: null });
      currentTime++;
      continue;
    }
    available.sort((a, b) => remaining[a.pid] - remaining[b.pid]);
    let proc = available[0];

    if (lastPid !== proc.pid) {
      if (lastPid !== null) {
        schedule.push({ pid: lastPid, start: startTime, end: currentTime });
      }
      startTime = currentTime;
      lastPid = proc.pid;
    }

    if (firstResponse[proc.pid] === undefined) {
      firstResponse[proc.pid] = currentTime - proc.arrivalTime;
    }

    remaining[proc.pid]--;
    timeLog.push({
      time: currentTime,
      running: proc.pid,
      ready: available.filter(p => p.pid !== proc.pid).map(p => p.pid),
      blocked: [],
      terminated: Array.from(completed)
    });

    currentTime++;

    if (remaining[proc.pid] === 0) {
      completed.add(proc.pid);
      metrics[proc.pid] = {
        completionTime: currentTime,
        turnaroundTime: currentTime - proc.arrivalTime,
        waitingTime: currentTime - proc.arrivalTime - proc.burstTimes.reduce((a, b) => a + b, 0),
        responseTime: firstResponse[proc.pid]
      };
      lastPid = null;
    }
  }
  if (lastPid !== null) {
    schedule.push({ pid: lastPid, start: startTime, end: currentTime });
  }

  return { schedule, metrics, timeLog };
}
module.exports = srtf;