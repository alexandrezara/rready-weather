import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    cities: [
      {
        city: "Rotterdam",
        position: 1,
        weather: null,
      },
      {
        city: "Zurich",
        position: 0,
        weather: null,
      },
      {
        city: "Belgrade",
        position: 2,
        weather: null,
      },
      {
        city: "Skopje",
        position: 3,
        weather: null,
      },
      {
        city: "Uberlandia",
        position: 4,
        weather: null,
      },
      {
        city: "Ribeirão Preto",
        position: 5,
        weather: null,
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
    addWidget(state: State, payload: any) {
      state.cities.push({
        city: payload.structured_formatting.main_text,
        position: state.cities.length,
        weather: null,
      });
    },
  },
  actions: {},
  modules: {},
});
