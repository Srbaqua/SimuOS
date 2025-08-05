// utils/colorUtils.js
const processColors = {};

export function getColorForProcess(pid) {
  if (!processColors[pid]) {
    const colors = ['#4CAF50', '#2196F3', '#FFC107', '#F44336', '#9C27B0', '#00BCD4', '#FF9800'];
    const index = Object.keys(processColors).length % colors.length;
    processColors[pid] = colors[index];
  }
  return processColors[pid];
}
