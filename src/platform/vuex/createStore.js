import Vuex from 'Vuex';
import Vue from 'vue'
Vue.use(Vuex);
import cmsApi from 'cmsApi';

const store = new Vuex.Store({
  state: {
    cmsApi,
    currentRoute: { to: {} },
    currentUser: {},
    allStyleArr: [],
    styleQuery: {},
    allCaseArr: [],
    caseQuery: {},
    showSideBar: true,
    industryList: []
  },
  mutations: {
    routeChange(state, payload) {
      state.currentRoute.to = payload.to;
    },
    toggleSidebar(state) {
      state.showSideBar = !state.showSideBar;
    },
    initIndustry(state, payload) {
      state.industryList = payload.data;
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
    },
    industryList(state){
      return state.industryList;
    }
  },
  actions: {
    getIndustry (context) {
      cmsApi.templateAndSite.getAllIndustry().then(response => {
        if(!response.ok){
          return 
        }
        return response.json();
      }).then(data => {
        context.commit('initIndustry', { data })
      });
    }
  }
});

export default store;
