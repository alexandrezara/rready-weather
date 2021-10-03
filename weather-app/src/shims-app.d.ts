import { ComponentCustomProperties } from "vue";
import { ICityWeather, SDK } from "@rready/weather-sdk";
import { Store } from "vuex";

// STORE

declare module "@vue/runtime-core" {
  interface State {
    settings: boolean,
    cities: WeatherConfig[];
  }

  interface WeatherConfig {
    city: string;
    subtitle: string;
    position: number;
    weather: ICityWeather?;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

// SDK

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: SDK;
  }
}
