<template>
  <div>
    <aside class="main-sidebar">
      <!-- Logo -->
      <a class="logo">
        <span class="logo-lg"><img src="./cmslogo.png" alt="" width="146px"></span>
      </a>
      <!-- sidebar -->
      <div class="sidebar">
        <!-- 左侧菜单 -->
        <ul class="sidebar-menu">
          <!--<li class="header">BUSINESS MENU</li>-->
          <router-link name="风格管理" to="/styleManage" active-class="active" tag="li">
            <a @click.pre>
              <i class="c-icon c-tempstyle-manage"></i>
              <span>风格管理</span>
            </a>
          </router-link>
          <router-link to="/caseManage" active-class="active" tag="li">
            <a @click.pre>
              <i class="c-icon c-webstyle-manage"></i>
              <span>案例管理</span>
            </a>
          </router-link> 
          <router-link to="/order" active-class="active" tag="li">
            <a @click.pre>
              <i class="c-icon c-order-manage"></i>
              <span>工单管理</span>
            </a>
          </router-link>
          <router-link to="/log" active-class="active" tag="li">
            <a @click.pre> 
              <i class="c-icon c-log-manage"></i>
              <span>日志管理</span>
            </a>
          </router-link>
          <li :class="{active: permissionActive}">
              <a @click.pre.stop="togglePermission">
              <i class="c-icon c-perm-manage"></i><span>权限管理</span>
              <i class="dropdown-icon fa"
                :class="{'fa-angle-down': permissionOpen,
                  'fa-angle-right' : !permissionOpen}"></i>
            </a>
            <ul :style="permissionOpen ? '' : 'display: none'">
              <router-link to="/role" active-class="active" tag="li">
                <a>角色管理</a>
              </router-link>
              <router-link to="/employee" active-class="active" tag="li">
                <a>员工管理</a>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
      <!-- /.sidebar -->
    </aside>
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

export default {
  data(){
    return {
      permissionOpen: false
    };
  },

  computed: {
    ...mapGetters(['currentRoutePath']),
    permissionActive() {
      return this.permissionOpen && (this.currentRoutePath === '/role' || this.currentRoutePath === '/employee');
    }
  },
  methods: {
    togglePermission() {
      this.permissionOpen = !this.permissionOpen;
    }
  },
  mounted() {
   
   console.log(this.currentRoute);
  },
  components: {
    
  }
}
</script>
