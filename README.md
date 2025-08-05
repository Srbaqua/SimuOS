<p align="center">
  <img src="./client//public/logo_dark.png" alt="SimuOS Logo" width="100"/>
</p>

<h1 align="center">SimuOS</h1>
<p align="center"><em>A Lightweight Operating System Scheduler Simulator</em></p>

---

## 🧠 Overview

**SimuOS** is an educational simulator designed to visualize and test different operating system scheduling algorithms. It helps students and developers understand how various scheduling strategies (like FCFS, SJF, Round Robin, etc.) affect process management and system performance.

## ✨ Features

- 🔁 **Supports Multiple Algorithms**
  - FCFS (First-Come, First-Served)
  - SJF (Shortest Job First)
  - Round Robin (RR)
  - Priority Scheduling
  - Multilevel Queue (planned)

- 📊 **Visualizations**
  - Gantt Chart View
  - Live Timeline Bar Chart (per-process state transitions)
  - Step-by-step Time Simulation

- 📈 **Metrics Display**
  - Turnaround Time
  - Waiting Time
  - Response Time (avg. & per-process)

- 🌗 **Dark/Light Mode Toggle**
- 📚 **Algorithm Explanations** (About Tab)
- ⚖️ **Comparison Mode** (planned)

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed

### Clone the Repo

```bash
git clone https://github.com/Srbaqua/SimuOS.git
cd SimuOS
cd client
npm install
cd..
cd server
npm install
```
Start the Dev Server
bash
```
npm start
App will run on http://localhost:3000
```
## 📚 About
SimuOS is designed for students, developers, and anyone learning Operating Systems. It's built to be intuitive and informative with visuals, interactivity, and clean UI.

Use SimuOS to understand:

How each algorithm schedules processes

Their pros & cons (available in About tab)

Why some perform better in specific scenarios

## 🤝 Contributing
Pull requests are welcome! If you have suggestions, feel free to open an issue.
