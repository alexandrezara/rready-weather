import { IWeather } from "./IWeather";

export interface IWidget {
  placeId: string;
  order: number;
  cityName: string;
  cityLocation: string;
  settings: IWidgetSettings;
  weather: IWeather;
}

export interface IWidgetSettings {
  showTemperature: boolean;
  showSunrise: boolean;
  showWindSpeed: boolean;
}
