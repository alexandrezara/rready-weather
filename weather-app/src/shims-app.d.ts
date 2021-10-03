import { ComponentCustomProperties } from "vue";
import { ICityWeather, SDK } from "@rready/weather-sdk";
import { Store } from "vuex";
import { IWidget } from "./model/IWidget";

// STORE

declare module "@vue/runtime-core" {
  interface State {
    settings: boolean;
    widgets: IWidget[];
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
