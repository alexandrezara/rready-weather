import { createApp } from "vue";
import { SDKOptions, sdkVue3 } from "@rready/weather-sdk";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const sdkOptions: SDKOptions = {
  baseUrl: process.env.VUE_APP_SDK_URL,
  apiKey: process.env.VUE_APP_SDK_KEY,
  timeout: 10000,
  handlers: {
    genericError(error: string) {
      console.warn("SDK Error: " + error);
    },
  },
};

createApp(App)
  .use(store)
  .use(router)
  .use(sdkVue3, sdkOptions)
  .mount("#app");
