import { IWeather } from "./IWeather";

export interface IWidget {
  searchKey: string;
  order: number;
  success: boolean;
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
