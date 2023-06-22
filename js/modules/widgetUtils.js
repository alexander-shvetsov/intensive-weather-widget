const addZero = num => {
  if (num <= 9) return '0' + num;
  else return num;
};

export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек'
  ];
  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];

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

export const getPressure = num => {
  return (num * 0.750063755419211).toFixed(0);
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
};

export const getWindDirection = deg => {
  if (deg > 10 && deg <= 80) {
    return '↙';
  } else if (deg > 80 && deg <= 100) {
    return '⬅';
  } else if (deg > 100 && deg <= 170) {
    return '↖';
  } else if (deg > 170 && deg <= 190) {
    return '⬆';
  } else if (deg > 190 && deg <= 260) {
    return '↗';
  } else if (deg > 260 && deg <= 280) {
    return '➡';
  } else if (deg > 280 && deg <= 350) {
    return '↘';
  } else {
    return '⬇';
  }
};

export const getDewPoint = (temp, humi) => {
  const a = 17.27;
  const b = 237.7;
  const lambda = (a * temp) / (b + temp) + Math.log(humi / 100);

  return ((b * lambda) / (a - lambda)).toFixed(0);
};

export const getWeatherForecastData = data => {
  const forecast = data.list.filter(
    item =>
      new Date(item.dt_txt).getHours() === 12 &&
      new Date(item.dt_txt).getDate() >= new Date().getDate()
  );

  const forecastData = forecast.map(item => {
    const date = new Date(item.dt_txt);

    const weekDaysShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const dayOfWeek = weekDaysShort[date.getDay()];

    const weatherIcon = item.weather[0].icon;

    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempData = new Date(data.list[i].dt_txt);

      if (tempData.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        } else {
          maxTemp = temp;
        }
      }
    }

    return { dayOfWeek, weatherIcon, maxTemp, minTemp };
  });

  return forecastData;
};
