<template>
  <div style="display: block;">
    <div class="group-menu c-h-scroll">
      <!--<tag-nav data="tagNavData"></tag-nav>-->
    </div>
    <div class="group-list-wrap" :style="{'minHeight': contentMinHeight}">
      <div class="t-m-tabs">
        <h4>标签管理</h4>
        <div class="input-group tag-search-form" ng-class="{'open': has}">
          <ul class="dropdown-menu" style="width: 100%">
            <li>
              <a href ng-click="openFile()">tag</a>
            </li>
            <!--<li ng-repeat="nav in data.array track by nav.id">
              <a href ng-click="goToNav($index)">{{nav.name}}</a>
            </li>-->
          </ul>
          <input class="form-control" placeholder="" ng-model="tagTreeSearchContent">
          <div class="input-group-btn">
            <button type="submit" class="btn btn-default only-ico" ng-click="searchTagTree()">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <!--<tag-tree data="tagTreeData"></tag-tree>-->
      </div>
      <!--<tag-nav data="tagNavData"></tag-nav>-->
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import {
    mapGetters
  } from 'vuex';

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
}
</script>
