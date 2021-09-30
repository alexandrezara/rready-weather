import { ComponentCustomProperties } from "vue";
import { SDK } from "@rready/weather-sdk";
import { Store } from "vuex";

// STORE

declare module "@vue/runtime-core" {
  interface State {
    cities: string[];
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
