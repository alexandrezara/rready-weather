import { IWeather } from "./IWeather";

export interface IWidget {
  placeKey: string;
  weatherKey: string | undefined;
  order: number;
  cityName: string;
  cityLocation: string;
  settings: IWidgetSettings;
  weather: IWeather | undefined;
}

export interface IWidgetSettings {
  showTemperature: boolean;
  showSunrise: boolean;
  showWindSpeed: boolean;
}
