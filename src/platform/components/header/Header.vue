<template>
  <header class="main-header">
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a class="sidebar-toggle" @click.pre="toggleSidebar">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <span class="navbar-welcome">欢迎您来到<a ui-sref="orderList">平台管理系统</a></span>
      <!-- 导航条右侧菜单 -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- 消息 -->
          <li class="dropdown notifications-menu">
            <a class="dropdown-toggle">
              <i class="fa fa-bell"></i>
              <span class="label label-danger">10</span>
            </a>
            <ul class="dropdown-menu" style="display: none">
              <li class="header">您有 10 条消息！</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;">
                  <ul class="menu" style="overflow: hidden; width: 100%; height: 200px;">
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                        page and may cause design problems
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-users text-red"></i> 5 new members joined
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-user text-red"></i> You changed your username
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="footer"><a href="#">查看全部</a></li>
            </ul>
          </li>
          <!-- 用户 -->
          <li class="dropdown user user-menu">
            <a class="dropdown-toggle">
              <img src="../user.jpg" class="user-image" alt="用户头像">
              <span class="hidden-xs">用户名称<i class="fa fa-caret-down"></i></span>
            </a>
            <ul class="dropdown-menu" style="display: none;">
              <!-- User image -->
              <li class="user-header">
                <img src="../user.jpg" class="img-circle" alt="User Image">
                <p>
                  用户名称 - 系统管理员
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">修改密码</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">个人资料</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">消息中心</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">安全退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- / 导航条右侧菜单 -->
    </nav>
  </header>
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
    mapGetters,
    mapMutations
  } from 'vuex';

export default {
  data(){
    return {
    };
  },
  methods: {
    ...mapMutations(['toggleSidebar'])
  },
  computed: {
    bodyMinHeight() {
      return {
        'minHeight' : document.body.clientHeight - 172 + 'px'
      };
    }
  },
  mounted() {
   
  },
  components: {
    
  }
}
</script>
