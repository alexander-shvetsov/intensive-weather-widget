import { fetchForecast, fetchWeather } from './APIservice.js';
import { renderWidgetForecast, renderWidgetOther, renderWidgetToday } from './widgetRender.js';
import { showError } from './widgetUtils.js';

export const startWidget = async () => {
  const city = 'Екатеринбург';

  const widget = document.createElement('div');
  widget.classList.add('widget');

  const weatherData = await fetchWeather(city);
  const weatherForecast = await fetchForecast(city);

  if (weatherData.success) {
    renderWidgetToday(widget, weatherData?.data);
    renderWidgetOther(widget, weatherData?.data);
  } else {
    showError(weatherData.error);
  }

  if (weatherForecast.success) {
    renderWidgetForecast(widget, weatherForecast.data);
  } else {
    showError(weatherForecast.error);
  }

  return widget;
};
