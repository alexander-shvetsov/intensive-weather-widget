const addZero = num => {
  if (num <= 9) return '0' + num;
  else return num;
};

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

export const getCelsius = num => {
  return (num - 273.15).toFixed(0);
};

// calc by directions: https://uni.edu/storm/Wind%20Direction%20slide.pdf
export const getWindDirection = deg => {
  if (deg > 11.25 && deg <= 56.25) {
    return '↗';
  } else if (deg > 56.25 && deg <= 90) {
    return '➡';
  } else if (deg > 90 && deg <= 168.75) {
    return '↘';
  } else if (deg > 168.75 && deg <= 191.25) {
    return '⬇';
  } else if (deg > 191.25 && deg <= 258.75) {
    return '↙';
  } else if (deg > 258.75 && deg <= 281.25) {
    return '⬅';
  } else if (deg > 281.25 && deg <= 348.75) {
    return '↖';
  } else {
    return '⬆';
  }
};

export const getDewPoint = (temp, humi) => {
  /**
   * Тр = (b*f(T, Rh))/(a-ƒ(T, Rh))
   * ƒ(T, Rh) = (a*T)/(b+T)+ln⁡(Rh/100)
   *
   * Тр – температура точки росы, °С;
   * a (постоянная) = 17,27;
   * b (постоянная) = 237,7;
   * Т – температура воздуха, °С;
   * Rh – относительная влажность воздуха, %;
   * ln – натуральный логарифм.
   */

  const a = 17.27;
  const b = 237.7;
  const lambda = (a * temp) / (b + temp) + Math.log(humi / 100);

  return ((b * lambda) / (a - lambda)).toFixed(2);
};
