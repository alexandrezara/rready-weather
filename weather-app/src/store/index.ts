import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    cities: ["Rotterdam", "Zurich", "Belgrade", "Skopje", "Uberlandia"],
  },
  mutations: {},
  actions: {},
  modules: {},
});
