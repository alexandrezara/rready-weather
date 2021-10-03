import { IAutocompleteItem } from "@/helpers/AutocompleteService";
import { IWidgetSettings } from "@/model/IWidget";
import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    configuringMode: false,
    widgets: [
      {
        key: "Rotterdam",
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
        key: "Zurich",
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
        key: "Belgrade",
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
        key: "Skopje",
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
        key: "Uberlandia",
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
        key: "Ribeirão Preto",
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
    moveCity(state: State, payload: any) {
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
    updateWeather(state: State, payload: any) {
      const city = state.widgets.find((x) => x.cityName == payload.city);
      if (city == undefined) {
        return;
      }
      city.weather = payload.weather;
    },
    addWidget(state: State, payload: IAutocompleteItem) {
      state.widgets.push({
        key: payload.structured_formatting.main_text,
        cityName: payload.structured_formatting.main_text,
        cityLocation:
          payload.terms.length > 1
            ? payload.terms[payload.terms.length - 1].value
            : " ",
        order: state.widgets.length,
        weather: undefined,
        settings: {
          showTemperature: false,
          showSunrise: false,
          showWindSpeed: false,
        },
      });
    },
    updateSettings(state: State) {
      state.configuringMode = !state.configuringMode;
    },
    updateSettingsConfig(
      state: State,
      payload: {
        city: string;
        settings: IWidgetSettings;
      }
    ) {
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
  modules: {},
});
