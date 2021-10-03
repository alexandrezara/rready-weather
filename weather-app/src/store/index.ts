import { IAutocompleteItem } from "@/helpers/AutocompleteService";
import { IWidgetSettings } from "@/model/IWidget";
import { State } from "vue";
import { createStore } from "vuex";
import {
  IMutationWidgetAdd,
  IMutationWidgetReorder,
  IMutationWidgetUpdateSettings,
  IMutationWidgetUpdateWeather,
} from "./mutations";

export default createStore<State>({
  state: {
    configuringMode: false,
    widgets: [
      {
        placeKey: "Rotterdam",
        weatherKey: undefined,
        order: 1,
        cityName: "Rotterdam",
        cityLocation: "Países Baixos",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        placeKey: "Zurich",
        weatherKey: undefined,
        order: 0,
        cityName: "Zurich",
        cityLocation: "Suíça",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        placeKey: "Belgrade",
        weatherKey: undefined,
        order: 2,
        cityName: "Belgrade",
        cityLocation: "Sérvia",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        placeKey: "Skopje",
        weatherKey: undefined,
        order: 3,
        cityName: "Skopje",
        cityLocation: "Macedônia",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        placeKey: "Uberlandia",
        weatherKey: undefined,
        order: 4,
        cityName: "Uberlandia",
        cityLocation: "Brasil",
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
        weather: undefined,
      },
      {
        placeKey: "Ribeirão Preto",
        weatherKey: undefined,
        order: 5,
        cityName: "Ribeirão Preto",
        cityLocation: "Brasil",
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
        placeKey: payload.cityName,
        weatherKey: undefined,
        cityName: payload.cityName,
        cityLocation: payload.cityLocation,
        order: 0,
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
      city.weather = payload.weather;
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
