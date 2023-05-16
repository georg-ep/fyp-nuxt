import Vuex from "vuex";
import user from "./user/state";
import logs from "./logs/state";
import activities from "./activities/state";
import breathing from "./breathing/state";

export const state = () => ({
  snackbar: { type: "", text: "", show: false, },
});
export const getters = {};
export const actions = {};
export const mutations = {
  setSnackbar(state, data) {
    state.snackbar = data;
  }
};

const createStore = () =>
  new Vuex.Store({
    namespaced: true,
    // strict: debug,
    state,
    getters,
    actions,
    mutations,
    modules: {
      user,
      logs,
      activities,
      breathing,
    },
  });

export default createStore;