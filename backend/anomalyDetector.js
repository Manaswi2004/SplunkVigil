// Simple heuristic for demo: high count or avg_bytes = high risk
function scoreBehavior(count, avg_bytes) {
  const c = Math.min(count / 100, 1);
  const b = Math.min(avg_bytes / 10000, 1);
  return (c + b) / 2;
}

module.exports = { scoreBehavior };
