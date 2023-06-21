import { startWidget } from './modules/widgetService.js';

const weatherInstance = async app => {
  const widget = await startWidget();
  app.append(widget);
};

weatherInstance(document.querySelector('#weather-app'));
