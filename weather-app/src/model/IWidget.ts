import { IWeather } from "./IWeather";

export interface IWidget {
  key: string;
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
