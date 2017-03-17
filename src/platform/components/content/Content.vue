<template>
  <div class="content-wrapper">
    <!--顶部面包屑-->
    <div class="content-crumb">
      <ol class="breadcrumb">
        <li class="active">
          <a>{{ currentRouteName }}</a>
        </li>
      </ol>
    </div>
    <!-- Main content -->
    <div class="content body" :style="bodyMinHeight">
      <!--<ui-view></ui-view>-->
      <!--<p>
        <router-link to="/styleManage">Go to home</router-link>
        <router-link to="/caseManage">Go to news</router-link>
        <router-link to="/order">Go to about</router-link>
      </p>-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- / content -->
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
    };
  },
  computed: {
    ...mapGetters(['currentRouteName']),
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
