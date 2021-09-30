import { SDK } from "./SDK";
import { SDKOptions } from "./SDKOptions";

export const sdkVue2 = {
  install: function (Vue: any, options: SDKOptions) {
    Vue.prototype.$api = new SDK(options);
  },
};

export const sdkVue3 = {
  install: function (app: any, options: SDKOptions) {
    app.config.globalProperties.$api = new SDK(options);
  },
};
