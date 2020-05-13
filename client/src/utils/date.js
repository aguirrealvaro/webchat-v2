export const calculateDate = (date) => {
  const myDate = new Date(date);
  const minutes = myDate.getMinutes();
  const hours = myDate.getHours();
  const day = myDate.getDate();
  const month = myDate.getMonth() + 1;
  const fullDate = `${hours}:${minutes} — ${day}/${month}`;
  return fullDate;
};
