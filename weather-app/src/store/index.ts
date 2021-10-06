import { State } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  IMutationWidgetAdd,
  IMutationWidgetReorder,
  IMutationWidgetUpdateSettings,
  IMutationWidgetUpdateWeather,
  IMutationWidgetUpdateWeatherFail,
} from "./mutations";

export default createStore<State>({
  plugins: [createPersistedState()],
  state: {
    networkOn: true,
    configuringMode: false,
    widgets: [
      {
        searchKey: "Rotterdam",
        success: true,
        order: 1,
        cityName: "Rotterdam",
        cityLocation: "Netherlands",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        searchKey: "Zürich",
        success: true,
        order: 0,
        cityName: "Zürich",
        cityLocation: "Switzerland",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        searchKey: "Belgrade",
        success: true,
        order: 2,
        cityName: "Belgrade",
        cityLocation: "Serbia",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        searchKey: "Skopje",
        success: true,
        order: 3,
        cityName: "Skopje",
        cityLocation: "Macedonia",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        searchKey: "Uberlandia",
        success: true,
        order: 4,
        cityName: "Uberlandia",
        cityLocation: "Brazil",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        searchKey: "Ribeirão Preto",
        success: true,
        order: 5,
        cityName: "Ribeirão Preto",
        cityLocation: "Brazil",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
    ],
  },
  mutations: {
    _debug_updateNetwork(state: State, payload: boolean) {
      state.networkOn = payload;
      for (var widget of state.widgets) {
        widget.success = false;
        widget.weather = undefined;
      }
    },
    toggleConfiguringMode(state: State) {
      state.configuringMode = !state.configuringMode;
    },

    widgetReorder(state: State, payload: IMutationWidgetReorder) {
      if (payload.from == payload.to) {
        return;
      } else if (payload.from < payload.to) {
        for (var city of state.widgets) {
          if (city.order > payload.from && city.order <= payload.to) {
            city.order -= 1;
          } else if (city.order == payload.from) {
            city.order = payload.to;
          }
        }
      } else {
        for (var city of state.widgets) {
          if (city.order >= payload.to && city.order < payload.from) {
            city.order += 1;
          } else if (city.order == payload.from) {
            city.order = payload.to;
          }
        }
      }
    },

    widgetAdd(state: State, payload: IMutationWidgetAdd) {
      for (let widget of state.widgets) {
        widget.order += 1;
      }
      state.widgets.push({
        searchKey: payload.cityName,
        order: 0,
        success: true,
        cityName: payload.cityName,
        cityLocation: payload.cityLocation,
        weather: undefined,
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
      });
    },

    widgetUpdateWeather(state: State, payload: IMutationWidgetUpdateWeather) {
      const city = state.widgets.find((x) => x.cityName == payload.city);
      if (city == undefined) {
        return;
      }
      city.success = true;
      city.weather = payload.weather;
    },

    widgetUpdateWeatherReload(state: State, cityName: string) {
      const city = state.widgets.find((x) => x.cityName == cityName);
      if (city == undefined) {
        return;
      }
      city.success = true;
      city.weather = undefined;
    },

    widgetUpdateWeatherFail(
      state: State,
      payload: IMutationWidgetUpdateWeatherFail
    ) {
      const city = state.widgets.find((x) => x.cityName == payload.city);
      if (city == undefined) {
        return;
      }
      city.success = false;
      city.weather = undefined;
    },

    widgetUpdateSettings(state: State, payload: IMutationWidgetUpdateSettings) {
      const city = state.widgets.find((x) => x.cityName == payload.city);
      if (city == undefined) {
        return;
      }
      city.settings.showTemperature = payload.settings.showTemperature;
      city.settings.showSunrise = payload.settings.showSunrise;
      city.settings.showWindSpeed = payload.settings.showWindSpeed;
    },
  },
  actions: {},
  getters: {
    findWidget: (state) => (city: string) => {
      return state.widgets.find((x) => x.cityName == city);
    },
  },
  modules: {},
});
