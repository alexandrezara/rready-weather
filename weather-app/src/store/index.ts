import { IAutocompleteItem } from "@/helpers/AutocompleteService";
import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    settings: false,
    widgets: [
      {
        key: "Rotterdam",
        order: 1,
        cityName: "Rotterdam",
        cityLocation: "Países Baixos",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        key: "Zurich",
        order: 0,
        cityName: "Zurich",
        cityLocation: "Suíça",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        key: "Belgrade",
        order: 2,
        cityName: "Belgrade",
        cityLocation: "Sérvia",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        key: "Skopje",
        order: 3,
        cityName: "Skopje",
        cityLocation: "Macedônia",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        key: "Uberlandia",
        order: 4,
        cityName: "Uberlandia",
        cityLocation: "Brasil",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        key: "Ribeirão Preto",
        order: 5,
        cityName: "Ribeirão Preto",
        cityLocation: "Brasil",
        settings: undefined,
        weather: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
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
        settings: undefined,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      });
    },
    updateSettings(state: State) {
      state.settings = !state.settings;
    },
    updateSettingsConfig(state: State, payload: any) {
      const city = state.widgets.find((x) => x.cityName == payload.city);
      if (city == undefined) {
        return;
      }
      city.config.minMaxtemperature = payload.settings.minMaxtemperature;
      city.config.sunsetSunrise = payload.settings.sunsetSunrise;
      city.config.windSpeed = payload.settings.windSpeed;
    },
  },
  actions: {},
  modules: {},
});
