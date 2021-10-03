import { IWeather } from "@/model/IWeather";
import { IWidgetSettings } from "@/model/IWidget";

export interface IMutationWidgetReorder {
  from: number;
  to: number;
}

export interface IMutationWidgetAdd {
  cityName: string;
  cityLocation: string;
}

export interface IMutationWidgetUpdateWeather {
  city: string;
  weather: IWeather;
}

export interface IMutationWidgetUpdateSettings {
  city: string;
  settings: IWidgetSettings;
}
