import Vue from 'vue'
import store from './vuex/createStore'
import MainBody from './components/MainBody.vue'
// import VueRouter from 'vue-router'
// import router from './router'

// Vue.use(VueRouter); 

new Vue({
  // router,
  store, // 注入到所有子组件1
  el: '#appRoot',
  components: { mainbody: MainBody } 
});
