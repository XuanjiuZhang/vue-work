<template>
  <div class="style-m-item" ng-class="btnClass[buttonGroup.length]">
    <div class="sm-i-body">
      <div class="sm-i-img">
        <!--<img ng-src="{{data.sampleImageUrl || './img/style-img_03.jpg'}}" alt="">-->
        <div class="sm-i-hover">
          <div class="vertical-middle">
            <div class="middle-cell">

              <div class="plr15" ng-if="platformType == 'facilitator' && currentTab == 'design' && type == 'template'">
                <div class="col-xs-offset-1" ng-class="!data.isDefault && !(data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 1) ? 'col-xs-5': 'col-xs-10'">
                  <a ng-click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
                <div class="col-xs-5" ng-if="!data.isDefault && !(data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 1)">
                  <a ng-click="setDefault()" class="thumb-btn"><span><i class="fa fa-check"></i></span><br>设置默认</a>
                </div>
              </div>

              <div class="plr15" ng-if="platformType == 'enterprise' && type == 'site'">
                <div class="col-xs-offset-1" ng-class="!data.isDefault && (data.auditType === 1 && data.currentAuditStatus === 2) || (data.auditType === 2) ? 'col-xs-5': 'col-xs-10'">
                  <a ng-click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
                <div class="col-xs-5" ng-if="!data.isDefault && (data.auditType === 1 && data.currentAuditStatus === 2) || (data.auditType === 2)">
                  <a ng-click="setDefault()" class="thumb-btn"><span><i class="fa fa-check"></i></span><br>设置默认</a>
                </div>
              </div>

              <div class="plr15" ng-if="platformType == 'facilitator' && currentTab == 'design' && type == 'site'">
                <div class="col-xs-offset-1" ng-class="!data.isDefault ? 'col-xs-5': 'col-xs-10'">
                  <a ng-click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
                <div class="col-xs-5" ng-if="!data.isDefault">
                  <a ng-click="setDefault()" class="thumb-btn"><span><i class="fa fa-check"></i></span><br>设置默认</a>
                </div>
              </div>

              <div class="plr15" ng-if="(platformType == 'facilitator' && currentTab == 'audit' && type == 'template')
              || (platformType == 'facilitator' && currentTab == 'audit' && type == 'site')
                || platformType == 'platform' || platformType == 'platformCase'">
                <div class="col-xs-10 col-xs-offset-1">
                  <a ng-click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm-i-txt">
        <!--<p>编号：{{data.code}}</p>
        <p>名称：{{data.name}}</p>-->
      </div>
      <div>
        <label class="sm-i-status label-primary"
              ng-show="(data.auditType === 0 && data.currentAuditStatus === 0 && data.status === 1)
              || (data.auditType == null && data.currentAuditStatus == null && data.status === 1)">设计中</label>
        <label class="sm-i-status label-warning"
              ng-show="data.auditType === 0 && data.currentAuditStatus === 1 && data.status === 1">验收中</label>
        <label class="sm-i-status label-primary"
              ng-show="data.auditType === 1 && data.currentAuditStatus === 2 && data.status === 1">上架审核中</label>
        <label class="sm-i-status label-danger"
              ng-show="data.auditType === 1 && data.currentAuditStatus === 3 && data.status === 1">验收不通过</label>
        <label class="sm-i-status label-success"
              ng-show="data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 0">出售中</label>
        <label class="sm-i-status label-danger"
              ng-show="data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 1">已下架</label>
        <label class="sm-i-status label-danger"
              ng-show="data.auditType === 2 && data.currentAuditStatus === 3">上架审核不通过</label>
      </div>
    </div>

    <div class="sm-i-operate btn-group-sm text-center">
      <button class="btn btn-default hover-info-o">设计</button>
      <button ng-click="audit('send')"
              class="btn btn-default hover-primary-o">送审</button>
      <button ng-if="(data.auditType === 0 && data.currentAuditStatus === 1 && data.status === 1)"
              ng-click="audit('cancel')"
              class="btn btn-default hover-primary-o">取消送审</button>
      <button ng-click="delete()" class="btn btn-default hover-danger-o">删除</button>
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
    },
    mounted() {

    },
    methods: {
    },
    components: {

    }
  }

</script>
