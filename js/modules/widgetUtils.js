export const getCurrentDateTime = () => {
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const weekDays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

  const date = new Date();

  const dayOfMonth = date.getDate();
  const dayOfWeek = weekDays[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return { dayOfMonth, dayOfWeek, month, year, hours, minutes };
};

const addZero = num => {
  if (num <= 9) return '0' + num;
  else return num;
};
