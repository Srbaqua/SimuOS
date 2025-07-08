// FCFS Scheduling Algorithm
function fcfs(processes) {
  // Sort by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let schedule = [];
  let metrics = {};

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

    currentTime = end;
  }

  return { schedule, metrics };
}

module.exports = fcfs;
