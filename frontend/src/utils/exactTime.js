
const exactTime =(timeString)=>{
  const date = new Date(timeString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`
}
export default exactTime;

function padZero(number){
  return number.toString().padStart(2, "0");
}