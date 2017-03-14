import Vuex from 'Vuex';
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentRoute: { to: {} },
    currentUser: {},
    allStyleArr: [],
    styleQuery: {},
    allCaseArr: [],
    caseQuery: {},
    showSideBar: true
  },
  mutations: {
    routeChange(state, payload) {
      state.currentRoute.to = payload.to;
    },
    toggleSidebar(state) {
      state.showSideBar = !state.showSideBar;
    }
  },
  getters: {
    currentRoutePath(state) {
      const { to : { path = '/styleManage' } = {} } = state.currentRoute;
      return path;
    },
    currentRouteName(state) {
      const { to : { name = '风格管理' } = {} } = state.currentRoute;
      return name;
    },
    // currentBreadCrumb(state) {
    //   const { to : { name = '风格管理' } = {} } = state.currentRoute;
    //   return name;
    // },
    showSideBar(state) {
      return state.showSideBar;
    },
    breadcrumb(state){
      const { to : { path = '/styleManage' } = {} } = state.currentRoute;
      return {};
    }
  },
  actions: {
    increment (context) {
      setTimeout(() => {
        context.commit('increment', {amount: 10})
      }, 1000);
    }
  }
});

export default store;
