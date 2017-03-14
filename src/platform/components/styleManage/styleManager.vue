<template>
  <div class="box box-solid box-lg ng-scope">
    <div class="top-fixed-wrap clearfix">
      <div class="pull-left form-inline">
        <div class="clearfix">
          <div class="form-group">
            <select class="form-control" ng-options="item as item.name for item in purposeList" ng-model="purposeSelected" ng-change="paginationQuery()">
              </select>
          </div>

          <div class="form-group">
            <select class="form-control" ng-options="item as item.name for item in industryList" ng-model="industrySelected" ng-change="paginationQuery()"></select>
          </div>
          <div class="form-group">
            <select class="form-control" ng-options="item as item.name for item in colorList" ng-model="colorSelected" ng-change="paginationQuery()"></select>
          </div>
          <div class="form-group">
            <select class="form-control" ng-options="item as item.name for item in auditStatus" ng-model="auditSelected" ng-change="paginationQuery()"></select>
          </div>
          <div class="form-group">
            <select class="form-control" ng-options="item as item.name for item in templateType" ng-model="templateTypeSelected" ng-change="paginationQuery()"></select>
          </div>

          <div class="form-group">
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
          </div>
        </div>

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

  export default {
    data() {
      return {
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
    components: {

    }
  }

</script>
