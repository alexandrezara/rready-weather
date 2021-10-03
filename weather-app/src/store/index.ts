import { IAutocompleteItem } from "@/helpers/AutocompleteService";
import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    settings: false,
    cities: [
      {
        city: "Rotterdam",
        subtitle: "Países Baixos",
        position: 1,
        weather: null,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        city: "Zurich",
        subtitle: "Suíça",
        position: 0,
        weather: null,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        city: "Belgrade",
        subtitle: "Sérvia",
        position: 2,
        weather: null,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        city: "Skopje",
        subtitle: "Macedônia",
        position: 3,
        weather: null,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        city: "Uberlandia",
        subtitle: "Brasil",
        position: 4,
        weather: null,
        config: {
          minMaxtemperature: false,
          sunsetSunrise: false,
          windSpeed: false,
        },
      },
      {
        city: "Ribeirão Preto",
        subtitle: "Brasil",
        position: 5,
        weather: null,
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
        for (var city of state.cities) {
          if (city.position > payload.from && city.position <= payload.to) {
            city.position -= 1;
          } else if (city.position == payload.from) {
            city.position = payload.to;
          }
        }
      } else {
        for (var city of state.cities) {
          if (city.position >= payload.to && city.position < payload.from) {
            city.position += 1;
          } else if (city.position == payload.from) {
            city.position = payload.to;
          }
        }
      }
    },
    updateWeather(state: State, payload: any) {
      const city = state.cities.find((x) => x.city == payload.city);
      if (city) {
        city.weather = payload.weather;
      }
    },
    addWidget(state: State, payload: IAutocompleteItem) {
      state.cities.push({
        city: payload.structured_formatting.main_text,
        subtitle:
          payload.terms.length > 1
            ? payload.terms[payload.terms.length - 1].value
            : " ",
        position: state.cities.length,
        weather: null,
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
  },
  actions: {},
  modules: {},
});
