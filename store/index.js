import Vuex from "vuex";
import twitter from "./twitter/state";
import user from "./user/state";
import logs from "./logs/state";
import activities from "./activities/state";

export const state = () => ({});
export const getters = {};
export const actions = {};
export const mutations = {};

const createStore = () =>
  new Vuex.Store({
    namespaced: true,
    // strict: debug,
    state,
    getters,
    actions,
    mutations,
    modules: {
      twitter,
      user,
      logs,
      activities,
    },
  });

export default createStore;