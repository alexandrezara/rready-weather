export interface IWeather {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  condition: IWeatherCondition;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface IWeatherCondition {
  name: string;
  description: string;
  icon: string;
}
