import Vue from 'vue'
import _ from 'underscore';
import createStore from './vuex/createStore';
import cmsApi from '../cmsApi/index';
import platformWrapper from './components/PlatformWrapper'
window._ = _;
import VueRouter from 'vue-router'
Vue.use(VueRouter); 
import router from './router';

// router.beforeEach((to, from, next) => {
//   // ...
// })

router.afterEach((to, from) => {
  // ...
  console.log(to);
  createStore.commit('routeChange', { to });
})

window.onload = function(){
  new Vue({
    router,
    store: createStore, // 注入到所有子组件1
    el: '#wrapper',
    components: { platformWrapper }
  });
};
