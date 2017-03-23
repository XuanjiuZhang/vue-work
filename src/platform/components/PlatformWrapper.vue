<template>
  <div class="wrapper" :class="{ 'sidebar-collapse': !showSideBar }">
    <Platform-header></Platform-header>
    <!-- Left sidebar -->
    <Left-side></Left-side>
    <!-- / sidebar -->

    <!-- Content Wrapper -->
    <Platform-content></Platform-content>
    <!-- / content-wrapper -->

    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 0.0.1
      </div>
      湖南竞网智赢技术支持
      <!--<modal title="Modal Title" :show.sync="true" @ok="ok" @cancel="cancel">
          <div>Modal Body</div>

          <div slot="header">Modal Header</div>
          <div slot="title">Modal Title</div>
          <div slot="footer">Modal Footer</div>
      </modal>-->
      <strong>Copyright &copy; 2016 <a href="#">cms</a>.</strong> All rights
      reserved.
    </footer>

    <!-- 日志详情—弹框 start -->
    <div class="modal" style="display: none;">
      <div class="c-modal vertical-middle">
        <div class="middle-cell">
          <div class="setting-group modal-dialog modal-smd center-block c-h-scroll">
            <div class="modal-content">
              <div class="modal-header clearfix">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span></button>
                <span class="modal-title">详情</span>
              </div>
              <div class="modal-body log-info">
                <ul class="text-light">
                  <li class="row"><div class="col-xs-3 text-right">操作时间：</div><div class="col-xs-9 text-left">2016.09.09</div></li>
                  <li class="row"><div class="col-xs-3 text-right">员工姓名：</div><div class="col-xs-9 text-left">陈世杰</div></li>
                  <li class="row"><div class="col-xs-3 text-right">用户类型：</div><div class="col-xs-9 text-left">管理员</div></li>
                  <li class="row"><div class="col-xs-3 text-right">日志类型：</div><div class="col-xs-9 text-left">日志类型</div></li>
                  <li class="row"><div class="col-xs-3 text-right">功能模块：</div><div class="col-xs-9 text-left">新增角色</div></li>
                  <li class="row"><div class="col-xs-3 text-right">操作类型：</div><div class="col-xs-9 text-left">新增角色</div></li>
                  <li class="row"><div class="col-xs-3 text-right">IP：</div><div class="col-xs-9 text-left">192.168.1.1</div></li>
                  <li class="row"><div class="col-xs-3 text-right">操作内容：</div><div class="col-xs-9 text-left">新增角色xxxx新增角色xxxx新增角色xxxx新增角色xxx新增角色xxxxx新增角色xxxx新增角色xxxx</div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日志详情—弹框 end -->
    <div class="loading-box" style="display: none" ng-show="onLoading">
      <div class="line-scale-pulse-out-rapid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!--<i class="fa fa-refresh fa-spin"></i>-->
      <!--<span>加载中...</span>-->
    </div>
    
  </div>
</template>

<style lang="less" scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }
</style>

<script>
import Vue from 'vue';
import {
    mapGetters
  } from 'vuex';
import 'eleUIStyle/index.css';
import eleInput from 'myEleUI/input/index';
// import elePagination from 'myEleUI/pagination/index';
Vue.use(eleInput);  
// Vue.use(elePagination);
import LeftSide from './LeftSideBar/LeftSide.vue';
import PlatformContent from './content/Content.vue';
import PlatformHeader from './header/Header.vue';
// import eleSelect from 'eleUI/select/index';
// Vue.use(eleSelect);
import {
  Select,
  Option, 
  Pagination,
  DatePicker
} from 'element-ui';
Vue.use(Select);
Vue.use(Option); 
Vue.use(Pagination);
Vue.use(DatePicker);
// Vue.use(Message);

// import BootstrapVue from 'bootstrap-vue';
// Vue.use(BootstrapVue);
import Modal from 'thirdModal';
Vue.component('modal', Modal);

export default {
  data(){
    return {
    };
  },
  computed: {
    ...mapGetters(['showSideBar']),
  },
  mounted() {
   
  },
  components: {
    LeftSide,
    PlatformContent,
    PlatformHeader
  }
}
</script>
