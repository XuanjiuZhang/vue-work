import Vue from 'vue'
import _ from 'underscore';
window._ = _;
import store from './vuex/createStore'
import MainBody from './components/MainBody.vue'
// import VueRouter from 'vue-router'
// import router from './router'
import './lib/codePrettify/prettify.less'
import './lib/codePrettify/prettify'
import './style/transition.less'

// Vue.use(VueRouter); 

new Vue({
  // router,
  store, // 注入到所有子组件1
  el: '#appRoot',
  components: { MainBody } 
});
