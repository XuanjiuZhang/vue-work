<template>
  <div style="display: block;">
    <div class="group-menu c-h-scroll">
      <h4>标签管理</h4>
      <Tag-tree></Tag-tree>
    </div>
    <div class="group-list-wrap" :style="{minHeight: contentMinHeight}">
      <!--此处获取（最小高度 = 可视窗口高度 - 底部滚动条高度）-->
      <div class="t-m-tabs">
        <Tag-nav></Tag-nav>
      </div>
      <transition-group name="component-fade" mode="out-in">
        <div v-show="showHome" key="home">
          首页
        </div>
        <Tag-content v-show="!showHome" key="content"></Tag-content>
      </transition-group>
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
  // 引入eleUI控件
// import 'element-ui/lib/theme-default/index.css';
import 'eleUIStyle/index.css';
import eleTree from 'myEleUI/tree/index';
import eleInput from 'myEleUI/input/index';
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
    ...mapGetters(['opendFiles']),
    showHome(){
      return this.opendFiles.length === 0;
    }
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
