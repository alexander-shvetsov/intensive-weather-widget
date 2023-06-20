import { startWidget } from './modules/widgetService.js';

const weatherInstance = app => {
  const widget = startWidget();

  app.append(widget);
};

weatherInstance(document.querySelector('#weather-app'));
