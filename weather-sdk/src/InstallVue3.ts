import { SDK } from "./SDK";
import { SDKOptions } from "./SDKOptions";
import { ComponentCustomOptions } from "@vue/runtime-core";

export const sdkVue3 = {
  install: function (app: any, options: SDKOptions) {
    app.config.globalProperties.$api = new SDK(options);
  },
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: SDK;
  }
}
