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
    industryList: [],
    purposeList: [],
    colorList: [],
    templateStyle: [{
      name: '全部种类',
      id: undefined
    },{
      name: 'PC端',
      id: 'ccccc8c9-a51c-49eb-a433-0ce47b66dc00'
    }, {
      name: '移动端',
      id: 'aaccc8c9-a51c-49eb-a433-0ce47b66dc00'
    }]
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
    },
    initPurpose(state, payload){
      state.purposeList = payload.data;
    },
    initColor(state, payload){
      state.colorList = payload.data;
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
    },
    purposeList(state){
      return state.purposeList;
    },
    colorList(state){
      return state.colorList;
    },
    templateStyle(state){
      console.log(state.templateStyle);
      return state.templateStyle;
    },
    cmsApi(state){
      return state.cmsApi;
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
        data.unshift({ name: '全部行业', id: undefined });
        context.commit('initIndustry', { data })
      });
    },
    getPurpose (context) {
      cmsApi.templateAndSite.getAllPurpose().then(response => {
        if(!response.ok){
          return 
        }
        return response.json();
      }).then(data => {
        data.unshift({ name: '全部用途', id: undefined });
        context.commit('initPurpose', { data })
      });
    },
    getColor (context) {
      cmsApi.style.getAllColor().then(response => {
        if(!response.ok){
          return 
        }
        return response.json();
      }).then(data => {
        data.list.unshift({ name: '全部颜色', id: undefined });
        context.commit('initColor', { data: data.list })
      });
    }

  }
});

export default store;
