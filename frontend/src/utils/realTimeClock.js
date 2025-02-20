export function realtimeClock() {
  const date = new Date();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}
