const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'f57c07c42fdb7c4e584d11204c083a3b';

export const fetchWeather = async city => {
  try {
    const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`);
    if (!response.ok) throw new Error('Request error!');

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchForecast = async city => {
  try {
    const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=ru`);
    if (!response.ok) throw new Error('Request error!');

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
