<template>
  <div class="box box-solid box-lg ng-scope">
    <div class="top-fixed-wrap clearfix">
      <div class="pull-left form-inline">
        <div class="box-body clearfix">
          <div class="top-nav nav-tabs-custom clearfix">
            <ul class="nav nav-tabs">
              <!--<li ng-class="{active: pageInfo.currentTab === 'design'}" ng-click="activeTab('design')">
                <a href>所有风格</a></li>
              <li ng-class="{active: pageInfo.currentTab === 'audit'}" ng-click="activeTab('audit')">
                <a href>待审核</a></li>
              <li ng-class="{active: pageInfo.currentTab === 'design'}" ng-click="activeTab('design')">
                <a href>待上架</a></li>
              <li ng-class="{active: pageInfo.currentTab === 'audit'}" ng-click="activeTab('audit')">
                <a href>已上架</a></li>
              <li ng-class="{active: pageInfo.currentTab === 'audit'}" ng-click="activeTab('audit')">
                <a href>审核失败</a></li>-->
              <li v-for="(tab, index) in tabArr" :class="{active: index === currentTabIndex}" @click.prevent="activeTab(index)">
                <a href>{{ tab }}</a></li>
            </ul>
          </div>
          <div class="form-group">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item, index) in 5" :key="index" :label="'item.label'" value="fdsklf">
              </el-option>
            </el-select>
            <!--<select class="form-control" ng-options="item as item.name for item in purposeList" ng-model="purposeSelected" ng-change="paginationQuery()">
              </select>-->
          </div>

          <div class="form-group">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item, index) in 5" :key="index" :label="'item.label'" value="fdsklf">
              </el-option>
            </el-select>
            <!--<select class="form-control" ng-options="item as item.name for item in industryList" ng-model="industrySelected" ng-change="paginationQuery()"></select>-->
          </div>
          <div class="form-group">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item, index) in 5" :key="index" :label="'item.label'" value="fdsklf">
              </el-option>
            </el-select>
            <!--<select class="form-control" ng-options="item as item.name for item in colorList" ng-model="colorSelected" ng-change="paginationQuery()"></select>-->
          </div>
          <div class="form-group">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item, index) in 5" :key="index" :label="'item.label'" value="fdsklf">
              </el-option>
            </el-select>
            <!--<select class="form-control" ng-options="item as item.name for item in auditStatus" ng-model="auditSelected" ng-change="paginationQuery()"></select>-->
          </div>
          <div class="form-group">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item, index) in 5" :key="index" :label="'item.label'" value="fdsklf">
              </el-option>
            </el-select>
            <!--<select class="form-control" ng-options="item as item.name for item in templateType" ng-model="templateTypeSelected" ng-change="paginationQuery()"></select>-->
          </div>

          <!--<div class="form-group">
            <div class="input-group">
              <input type="text" name="table_search" class="form-control" placeholder="templateSelected.siteName || chooseTemplatePlaceHolder"
                readonly>
                <div class="input-group-btn">
                  <button ng-click="chooseTemplateOrSite()" class="btn btn-default only-ico"><b>···</b></button>
                </div>
            </div>
          </div>

          <div class="form-group">
            <div class="search-form input-group pull-right">
              <input type="text" class="form-control" ng-model="styleQueryData.code" ng-keydown="detectEnter($event)" placeholder="风格编号/名称">
              <span class="input-group-btn">
                <button type="button" ng-click="paginationQuery()" class="btn btn-default only-ico">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>-->
        </div>

      </div>
      <div class="style-m-cont">
        <ul class="style-m-list clearfix">
          <li v-for="data in 5">
            <Style-item></Style-item>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<style lang="less" scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  
  .component-fade-enter,
  .component-fade-leave-active {
    opacity: 0;
  }
</style>

<script>
  import Vue from 'vue';
  import {
    mapGetters
  } from 'vuex';
  import StyleItem from './StyleItem.vue';

  export default {
    data() {
      return {
        currentTabIndex: 0,
        tabArr: ['所有风格', '待审核', '待上架', '已上架', '审核失败']
      };
    },
    computed: {
    ...mapGetters(['currentRouteName']),
      bodyMinHeight() {
        return {
          'minHeight': document.body.clientHeight - 172 + 'px'
        };
      }
    },
    mounted() {

    },
    methods: {
      activeTab(index) {
        this.currentTabIndex = index;
      }
    },
    components: {
      StyleItem
    }
  }

</script>
