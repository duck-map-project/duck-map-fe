export default function formattingHours(hour: string) {
  const [period, time] = hour.split(' ');
  const [originalHours, minutes] = time.split(':');
  let hours = 0;
  if (period === 'PM' && originalHours !== '12') {
    hours = parseInt(originalHours) + 12;
  } else {
    hours = parseInt(originalHours);
  }
  const formattedHours = hours.toString().padStart(2, '0');
  return formattedHours + ':' + minutes;
}
