import { fetchWeather } from './APIservice.js';
import { renderWidgetForecast, renderWidgetOther, renderWidgetToday, showError } from './widgetRender.js';

export const startWidget = async () => {
  const widget = document.createElement('div');
  widget.classList.add('widget');

  const weatherData = await fetchWeather('Екатеринбург');

  if (weatherData.success) {
    renderWidgetToday(widget, weatherData?.data);
    renderWidgetOther(widget, weatherData?.data);
  } else {
    showError(widget, 'Error!');
  }

  renderWidgetForecast(widget);

  return widget;
};
