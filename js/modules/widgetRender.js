import {
  getCelsius,
  getCurrentDateTime,
  getDewPoint,
  getPressure,
  getWeatherForecastData
} from './widgetUtils.js';

export const renderWidgetToday = (widget, data) => {
  const { dayOfMonth, dayOfWeek, month, year, hours, minutes } = getCurrentDateTime();

  widget.insertAdjacentHTML(
    'beforeend',
    `
      <div class="widget__today">
        <div class="widget__date-block">
          <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
          <p class="widget__time">${hours}:${minutes}</p>
          <p class="widget__day">${dayOfWeek}</p>
        </div>
        <div class="widget__icon">
          <img class="widget__img" src="./icon/${data.weather[0].icon}.svg" alt="Погода" />
        </div>
        <div class="widget__wheather">
          <div class="widget__city">
            <p>${data.name}</p>
            <button class="widget__change-city" aria-label="Изменить город"></button>
          </div>
          <p class="widget__temp-big">${getCelsius(data.main.temp)} °C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${getCelsius(data.main.feels_like)} °C</p>
        </div>
      </div>
    `
  );
};

export const renderWidgetOther = (widget, data) => {
  const { wind, main } = data;

  widget.insertAdjacentHTML(
    'beforeend',
    `
      <div class="widget__other">
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">${wind.speed} м/с</p>
          <p class="widget__wind-text" style="transform: rotate(${wind.deg}deg)">⬇</p>
        </div>
        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${main.humidity}%</p>
          <p class="widget__humidity-text">Т.Р: ${getDewPoint(
            getCelsius(main.temp),
            main.humidity
          )} °C</p>
        </div>
        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${getPressure(main.pressure)}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
      </div>
    `
  );
};

export const renderWidgetForecast = (widget, data) => {
  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData(data);

  const dayItems = forecastData.map(item => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';

    widgetDayItem.insertAdjacentHTML(
      'beforeend',
      `
        <p class="widget__day-text">${item.dayOfWeek}</p>
        <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода" />
        <p class="widget__day-temp">${getCelsius(item.maxTemp)}°/ ${getCelsius(item.minTemp)}°</p>
      `
    );

    return widgetDayItem;
  });

  widgetForecast.append(...dayItems);
};
