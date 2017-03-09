<template>
  <div class="t-m-item-wrap c-h-scroll">
    <div class="t-m-item" style="display: block;">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" style="border-bottom: none;">
          <li><a href @click.prevent>用法说明</a></li>
          <li><a href @click.prevent>案例说明</a></li>
        </ul> 
      </div>
      <!--用法说明-->
      <div class="t-m-instruction">
        <Usage></Usage>
      </div>
      <!--案例说明-->
      <div class="t-m-instruction">
        <Case v-for="c in 5" :key="c"></Case>
      </div>
    </div>
    <div class="t-m-item" style="display: none;">
      <div class="table-responsive">
        <table class="table i-table">
          <thead>
          <tr>
            <td>字段名称(中文)</td>
            <td>字段名称(英文)</td>
            <td>字段类型</td>
            <td width="600">描述</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>字段名称(中文)</td>
            <td>字段名称(英文)</td>
            <td>字段类型</td>
            <td>
              <p class="tag-describe">描述描述描述描述描述描述描述描述描述</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Case from './contentSrc/Case.vue';
import Usage from './contentSrc/Usage.vue';

  export default {
    watch: {
    },

    methods: {
    },

    mounted(){
      
    },

    data() {
      return {
      };
    },

    components: {
      Case,
      Usage
    }
  };
</script>
