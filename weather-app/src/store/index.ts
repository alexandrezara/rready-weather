import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    cities: [
      "Rotterdam",
      "Zurich",
      "Belgrade",
      "Skopje",
      "Uberlandia",
      "Ribeirão Preto",
    ],
  },
  mutations: {
    moveCity(state: State, payload: any) {
      let indexFrom = state.cities.indexOf(payload.from);
      let indexTo = state.cities.indexOf(payload.to);
      let element = state.cities[indexFrom];
      state.cities.splice(indexFrom, 1);
      state.cities.splice(indexTo, 0, element);
    },
  },
  actions: {},
  modules: {},
});
