export function calculatePercentage(part, whole) {
  if (whole === 0) {
    return 0;
  }
  const result = (part / whole) * 100;
  return result.toFixed(2);
}
