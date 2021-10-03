import { IWeather } from "./IWeather";

export interface IWidget {
  key: string;
  order: number;
  cityName: string;
  cityLocation: string;
  settings: IWidgetSettings | undefined;
  weather: IWeather | undefined;

  config: any;
}

export interface IWidgetSettings {
  showTemperature: boolean;
  showSunrise: boolean;
  showWindSpeed: boolean;
}
