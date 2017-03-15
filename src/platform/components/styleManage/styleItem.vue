<template>
  <div class="style-m-item" ng-class="btnClass[buttonGroup.length]">
  <div class="sm-i-body">
    <div class="sm-i-img">
      <img :src="{{data.sampleImageUrl || './img/style-img_03.jpg'}}" alt="img">
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
          </div>
        </div>
      </div>
    </div>
    <div class="sm-i-txt">
      <p>编号：{{data.code}}</p>
      <p>名称：{{data.name}}</p>
    </div>
    <label ng-if="(data.auditType === 0 && data.currentAuditStatus === 1)"
        class="sm-i-status label-warning">待验收</label>
    <label ng-if="(data.auditType === 1 && data.currentAuditStatus === 2) || (data.auditType === 2)"
        class="sm-i-status label-success">验收通过</label>
    <label ng-if="(data.auditType === 1 && data.currentAuditStatus === 3)"
            class="sm-i-status label-danger">验收不通过</label>
    </div>
  </div>

  <div class="sm-i-operate btn-group-sm text-center"
       ng-if="platformType == 'platform'">
    <!--<button ng-click="preview()" class="btn btn-default hover-primary-o">预览</button>-->
    <button ng-if="data.auditType === 1 && data.currentAuditStatus === 2 && data.status === 1"
            ng-click="doAuditPlatform('pass')"
            class="btn btn-default hover-danger-o">通过</button>
    <button ng-if="data.auditType === 1 && data.currentAuditStatus === 2 && data.status === 1"
            ng-click="doAuditPlatform('reject')"
            class="btn btn-default hover-danger-o">不通过</button>
    <button ng-if="data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 1"
            ng-click="shelvesPlatform('up')"
            class="btn btn-default hover-danger-o">上架</button>
    <button ng-if="data.auditType === 2 && data.currentAuditStatus === 2 && data.status === 0"
            ng-click="shelvesPlatform('down')"
            class="btn btn-default hover-danger-o">下架</button>
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
