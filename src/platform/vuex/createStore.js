import Vuex from 'Vuex';
import Vue from 'vue'
Vue.use(Vuex);
import cmsApi from 'cmsApi';

const store = new Vuex.Store({
  state: {
    cmsApi,
    router: {},
    currentRoute: { to: {} },
    currentUser: {},
    showSideBar: true,
    industryList: [],
    purposeList: [],
    colorList: [],
    customerList: [],
    templateStyle: [{
      name: '全部种类',
      id: undefined
    },{
      name: 'PC端',
      id: 'ccccc8c9-a51c-49eb-a433-0ce47b66dc00'
    }, {
      name: '移动端',
      id: 'aaccc8c9-a51c-49eb-a433-0ce47b66dc00'
    }],
    currentOrder: {}
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
    },
    initCustomer(state, payload){
      state.customerList = payload.data;
    },
    storeRouter(state, payload){
      state.router = payload.router;
    },
    currentOrder(state, payload){
      state.currentOrder = payload.currentOrder;
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
    customerList(state){
      return state.customerList;
    },
    templateStyle(state){
      console.log(state.templateStyle);
      return state.templateStyle;
    },
    cmsApi(state){
      return state.cmsApi;
    },
    router(state){
      return state.router;
    },
    currentOrderData(state){
      return state.currentOrder;
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
    },
    getCustomer (context) {
      cmsApi.templateAndSite.getAllCustomer({ type: 2 }).then(res => {
        if (!res.ok) {
          return
        }
        return res.json();
      }).then(data => {
        data.unshift({ fullName: '全部客户', id: undefined });
        context.commit('initCustomer', { data });
      });
    }

  }
});

export default store;
