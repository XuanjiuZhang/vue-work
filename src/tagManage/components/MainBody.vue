<template>
  <div style="display: block;">
    <div class="group-menu c-h-scroll">
      <h4>标签管理</h4>
      <!--<div class="input-group tag-search-form" ng-class="{'open': has}">
        <ul class="dropdown-menu" style="width: 100%">
          <li>
            <a href ng-click="openFile()">tag</a>
          </li>
          <li ng-repeat="nav in data.array track by nav.id">
            <a href ng-click="goToNav($index)">{{nav.name}}</a>
          </li>
        </ul>
        <input class="form-control" placeholder="" ng-model="tagTreeSearchContent">
        <div class="input-group-btn">
          <button type="submit" class="btn btn-default only-ico" ng-click="searchTagTree()">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>-->
      <Tag-tree></Tag-tree>
      <!--<tag-tree data="tagTreeData"></tag-tree>-->
    </div>
    <div class="group-list-wrap" :style="{minHeight: contentMinHeight}">
      <!--此处获取（最小高度 = 可视窗口高度 - 底部滚动条高度）-->
      <div class="t-m-tabs">
        <Tag-nav></Tag-nav>
        <!--<tag-nav data="tagNavData"></tag-nav>-->
      </div>
      <Tag-content></Tag-content>
      <!--<ui-view></ui-view>-->
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import Vue from 'vue';
import {
    mapGetters
  } from 'vuex';
  // 引入eleUI控件
// import 'element-ui/lib/theme-default/index.css';
import 'eleUIStyle/index.css';
import eleTree from 'eleUI/tree/index';
import eleInput from 'eleUI/input/index';
Vue.use(eleTree);
Vue.use(eleInput);
// import {
//   Tree,
//   Input
// } from 'element-ui';
// Vue.component(Tree.name, Tree);
// Vue.component(Input.name, Input);
import TagTree from './TagTree.vue';
import TagNav from './TagNav.vue';
import TagContent from './TagContent.vue';

export default {
  data(){
    return {
      contentMinHeight: '0px',
      footerHeight: 61
    };
  },
  computed: {
    
  },
  mounted() {
    this.contentMinHeight = document.querySelector('body').offsetHeight - this.footerHeight + 'px';
  },
  components: {
    TagTree,
    TagNav,
    TagContent
  }
}
</script>
